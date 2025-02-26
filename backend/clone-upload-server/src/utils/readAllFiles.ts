import fs from 'fs';
import path from 'path';

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
