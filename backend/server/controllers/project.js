import {Project} from "../models/project.js";
import axios from "axios";
import { User } from "../models/user.js";

export const addProject = async(req, res) => {

    try {
        
   
    const {projectName,repoURL }= req.body

    let deployRepo= await axios.post(process.env.CLONE_UPLOAD_SERVER_URL+"/api/deploy",{repoURL});
    
    // console.log(deployRepo.data);

    let deployId = deployRepo.data.deployId || "abcd3d44r4";

    // let deployId= "abcd3d44r4";
    let hostedLink= process.env.USER_REQUEST_HANDLER_HOST_URL+`/${deployId}/index.html`;
    let githubURL= repoURL;


    const userId=req.user._id;
    // console.log(user)
    const project = new Project({
        projectName,
        deployId,
        userId,
        hostedLink,
        githubURL,
    });

    await project.save();

    const user = await User.findById(userId);
    user.projects.push(project._id);
    await user.save();  

    return res.status(200).json({ success: true, message: "Project added successfully",project });



    
} catch (error) {

    console.log("Error in addProject controller", error.message);

    return res.status(500).json({ success: false, message: "Internal Server Error" });
        
}

};

export const getProjects = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("projects");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const projects = user.projects;
        return res.status(200).json({ success: true, projects });
    } catch (error) {
        console.log("Error in getProjects controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};