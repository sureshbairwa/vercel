
export const generateDeployId = () => {
 
    let randomString = Math.random().toString(36).substring(2);
    while (randomString.length < 10) {
    randomString += Math.random().toString(36).substring(2);
    }
    randomString = randomString.substring(0, 10);
    return randomString;

}
