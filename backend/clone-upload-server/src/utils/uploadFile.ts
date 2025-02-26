import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Configure AWS S3 credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,    // Access key ID
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,    // Secret access key
    region: process.env.AWS_REGION    
});

const s3 = new AWS.S3();

export async function uploadFile(filePath: string, targetPath: string): Promise<void> {
    try {
        const fileContent = fs.readFileSync(filePath);
        
        const fileName = path.basename(filePath);
        
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME || '',  
            Key: `${targetPath}`,  // Target path in S3
            Body: fileContent
        };

        // console.log(uploadParams);
        
        // Upload the file to S3
        const data = await s3.upload(uploadParams).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
        console.log(`Uploaded file: ${fileName}`);
    } catch (err) {
        console.error("Error uploading file:", err);
        throw err;
    }
}

// Example 
// uploadFile('path/to/local/file.txt', 'folder/in/s3').catch(console.error);
