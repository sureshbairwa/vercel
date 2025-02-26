import { spawn } from 'child_process';
import path from 'path';

// Helper function to run commands and log output
const runCommand = (command: string, args: string[], cwd: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const cmdProcess = spawn(command, args, { cwd, shell: true });

        // Stream the output in real-time
        cmdProcess.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        cmdProcess.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        cmdProcess.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with exit code ${code}`));
            }
        });
    });
};

export const buildProject = async (repoId: string): Promise<void> => {

    const projectPath = path.join(__dirname, '../gitrepo/', repoId);
    console.log(projectPath);

    try {
        console.log(`Starting build for project in ${projectPath}`);

        console.log('Running npm install...');
        await runCommand('npm', ['install'], projectPath);
        console.log('npm install completed.');

        console.log('Running npm run build...');
        await runCommand('npm', ['run', 'build'], projectPath);
        console.log('Build process completed.');

    } catch (error) {
        console.error(`Error during build process for repo ${repoId}:`, error);
        throw error; 
    }
};



