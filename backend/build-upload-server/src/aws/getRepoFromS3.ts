import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials are not defined');
}

const s3Client = new S3Client({
    region: process.env.AWS_REGION,  
    credentials: {
        accessKeyId,
        secretAccessKey,
    }
});

const streamPipeline = promisify(pipeline);


export const getRepoFromS3 = async (repoId: string): Promise<void> => {
    const bucketName = process.env.AWS_BUCKET; 
    const s3Folder = `gitrepo/${repoId}`; 
    const localFolder = path.join(__dirname,'../gitrepo');  

    if (!fs.existsSync(localFolder)) {
        fs.mkdirSync(localFolder, { recursive: true });
    }

    try {
       
        const listParams = {
            Bucket: bucketName,
            Prefix: s3Folder  
        };

        const listCommand = new ListObjectsV2Command(listParams);
        const response = await s3Client.send(listCommand);

        const files = response.Contents;
        if (!files || files.length === 0) {
            console.log(`No files found in the folder: ${s3Folder}`);
            return;
        }

        for (const file of files) {
            const s3Key = file.Key as string; 

            const relativeFilePath = s3Key.replace(s3Folder, '').replace(/^\//, '');
            const localFilePath = path.join(localFolder, relativeFilePath);  

            const localDir = path.dirname(localFilePath);
            if (!fs.existsSync(localDir)) {
                fs.mkdirSync(localDir, { recursive: true });
            }

            console.log(`Downloading ${relativeFilePath} from S3...`);

            const downloadParams = {
                Bucket: bucketName,
                Key: s3Key
            };

            const getCommand = new GetObjectCommand(downloadParams);
            const fileData = await s3Client.send(getCommand);

            if (fileData.Body) {
                const writeStream = fs.createWriteStream(localFilePath);
                await streamPipeline(fileData.Body as NodeJS.ReadableStream, writeStream);
                console.log(`Downloaded: ${localFilePath}`);
            }
        }

    } catch (error) {
        console.error('Error downloading repo from S3:', error);
    }
};
