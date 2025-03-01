import { createClient, commandOptions } from "redis";
import { getRepoFromS3 } from "./aws/getRepoFromS3";
import { buildProject } from "./utils/buildProject";
import { uploadToS3 } from "./aws/uploadToS3";
import dotenv from "dotenv";
// import { deleteFolder } from "./aws/uploadToS3";
// import path from "path";

dotenv.config();

const subscriber = createClient({
  url: process.env.REDIS_URL,
});
subscriber.connect();

const main = async () => {
  while (true) {
    const res = await subscriber.brPop(
      commandOptions({ isolated: true }),
      "build-repo",
      0
    );

    let repoId = res?.element;
    console.log(`Received build request for repoId: ${repoId}`);
    if (typeof repoId === "string" && repoId) {
      await getRepoFromS3(repoId)
        .then(() => {
          console.log("All files downloaded successfully.");
        })
        .catch(console.error);

      await buildProject()
        .then(() => {
          console.log("Project build successful.");
        })
        .catch((error) => {
          console.error("Project build failed:", error);
        });

      

      await uploadToS3(repoId)
        .then(() => {
          console.log("All files uploaded successfully.");
        })
        .catch(console.error);
    } else {
      console.error(
        "Invalid repoId: repoId is either undefined or not a string."
      );
    }
  }
};

// const repoId = "12345"; // Replace with actual repoId
// getRepoFromS3(repoId).then(() => {
//     console.log('All files downloaded successfully.');
// }).catch(console.error);

// const repoId = '12345';  // Example repoId
// buildProject()
//     .then(() => {
//         console.log('Project build successful.');
//     })
//     .catch(error => {
//         console.error('Project build failed:', error);
//     });

// uploadToS3(repoId).then(() => {
//     console.log('All files uploaded successfully.');
// }
// ).catch(console.error);
// runDockerCompose();

// deleteFolder(path.join(__dirname, '/gitrepo'));




main();
