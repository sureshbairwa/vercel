import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();


export const deleteFolder = async (folderPath: string) => {
    try {
      await fs.promises.rmdir(folderPath, { recursive: true });
      console.log(`Folder "${folderPath}" deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting folder "${folderPath}":`, error);
    }
  };

export const uploadToS3 = async(repoId:string)=>{
    const files = await readAllFiles(path.join(__dirname, '../gitrepo/','dist'));
    console.log(files);
    for(const file of files){
        const relativePath = path.relative(path.join(__dirname, `../gitrepo`), file);

        const normalizedRelativePath = relativePath.replace(/\\/g, '/');

        const targetPath = `dist/${repoId}/${normalizedRelativePath}`;

        console.log("targetPath",targetPath);

        await uploadFile(file, targetPath);
        }

        await deleteFolder(path.join(__dirname, '../gitrepo'));

     

}


export const readAllFiles = async (dir: string): Promise<string[]> => {
    const files = await fs.promises.readdir(dir);
    const filesList: string[] = [];
    for (const file of files) {
        const filePath = path.join(dir, file);

        console.log("file-> ",file);
        // if (file === '.git') {
        //     continue;
        // }
        const stat = await fs.promises
            .lstat(filePath)
            .catch((err) => console.log(err));
        if (stat && stat.isDirectory()) {
            const nestedFiles = await readAllFiles(filePath);
            filesList.push(...nestedFiles);
        } else {
            filesList.push(filePath);
        }
    }
    return filesList;
 
};




AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,   
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,    
    region: process.env.AWS_REGION    
});

const s3 = new AWS.S3();

export async function uploadFile(filePath: string, targetPath: string): Promise<void> {
    try {
        const fileContent = fs.readFileSync(filePath);
        
        const fileName = path.basename(filePath);
        
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET || '',  
            Key: `${targetPath}`, 
            Body: fileContent
        };

        
        const data = await s3.upload(uploadParams).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
        console.log(`Uploaded file: ${fileName}`);
    } catch (err) {
        console.error("Error uploading file:", err);
        throw err;
    }
}

// Example usage:
// uploadFile('path/to/local/file.txt', 'folder/in/s3').catch(console.error);

