import { exec, ExecException } from 'child_process';

const command = 'docker-compose up --build';

function runDockerCompose(): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = exec(command);

    child.stdout?.on('data', (data: string) => {
      console.log(`Output: ${data}`);
    });

    child.stderr?.on('data', (data: string) => {
      console.error(`Error: ${data}`);
    });

    child.on('close', (code: number) => {
      if (code === 0) {
        console.log(`Process exited successfully with code ${code}`);
        resolve(); 
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    child.on('error', (error: ExecException) => {
      console.error(`Execution error: ${error.message}`);
      reject(error); 
    });
  });
}

export const buildProject = async (): Promise<void> => {
 
    await runDockerCompose();
   
};
