import express from "express";
import { S3 } from "aws-sdk";
import mime from "mime-types"; 
import cookieParser from "cookie-parser";
import { generateToken } from "./utils/generateToken";
import jwt, { decode } from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3({
    region: process.env.AWS_RIGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const app = express();
app.use(cookieParser());

app.get("/:id/*", async (req, res) => {
    try {
        const host = req.hostname;
        let filePath = req.path;
        let id: string = req.params.id;
        
        let cookie = req.cookies["hostid"];
        
        if (!cookie) {
            let token = generateToken(id); 
            res.cookie("hostid", token);
        }
        
        if(cookie){
            let decoded=await jwt.verify(cookie,"jwt-secret") as string;
            id=decoded
            
           
        }

        
        
        if (filePath.startsWith(`/${id}`)) {
            filePath = filePath.substring(id.length + 2); 
        }else if(filePath.startsWith(`/`)){
            filePath = filePath.substring(1);
        }

      
        
        console.log("Processed filePath:", filePath);
        console.log("id-> ",id,"filePath-> ",filePath)

        



       

        
        
        
        

        // console.log(id, filePath);
        console.log("user id");

        const contents = await s3.getObject({
            Bucket: "my-vercel-clone-repodata",
            Key: `dist/${id}/dist/${filePath}`,
        }).promise();

        console.log("file contents -> ", contents);
        console.log("received file");

        //  mime-types to automatically detect the file's content type
        const contentType = mime.lookup(filePath) || "application/octet-stream";
        console.log("Detected content type:", contentType);

        res.set("Content-Type", contentType);
        res.send(contents.Body);
    } catch (error) {
        console.log("error in fetching file", error);
        res.status(404).send({ error: "File not found" });
    }
});

app.listen(process.env.PORT , () => {
    console.log("Server is running on port ", process.env.PORT);
});
