import express from 'express';
import { generateDeployId } from '../utils/generatDeployId';
import simpleGit from 'simple-git';
import path from 'path';
import { readAllFiles } from '../utils/readAllFiles';
import { uploadFile } from '../utils/uploadFile';
import { createClient } from 'redis';

const router = express.Router();
const publisher = createClient();
publisher.connect();

const uploadAllFiles = async (files: string[], Id: string) => {



}

router.get('/hi', async (req, res) => {
  const Id="0uaw17f4u0"
  const files = await readAllFiles(path.join(__dirname,`../gitrepo/${Id}`));

  for (const file of files) {
    const relativePath = path.relative(path.join(__dirname, `../gitrepo`), file);

    const normalizedRelativePath = relativePath.replace(/\\/g, '/');

    const targetPath = `dist/${normalizedRelativePath}`;

    console.log("file",targetPath);

    await uploadFile(file, targetPath);
}

  res.send('deploy hi ');
});

router.post('/',async (req,res)=>{

    try {

    const {repoURL} = req.body;
    console.log(repoURL);
    const Id=generateDeployId();
    const git = simpleGit();
    // const Id="0uaw17f4u0"
    await git.clone(repoURL,path.join(__dirname,`../gitrepo/${Id}`));
    console.log("Cloned");
    
    const files = await readAllFiles(path.join(__dirname,`../gitrepo/${Id}`));

    for(const file of files){
           const relativePath = path.relative(path.join(__dirname, `../gitrepo`), file);

    const normalizedRelativePath = relativePath.replace(/\\/g, '/');

    const targetPath = `gitrepo/${normalizedRelativePath}`;

    console.log("file",targetPath);

    await uploadFile(file, targetPath);
    }

    publisher.lPush("build-repo",Id);

    // console.log(files);
    res.status(200).json({deployId:Id});

    

        
    } catch (error) {
        console.log("Erron in deploy.ts",error);
        res.status(500).json({message:"Internal server error"});
        
    }
    
})

export default router;