import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";

import { addProject } from "../controllers/project.js";
import { getProjects } from "../controllers/project.js";

const router = express.Router();

router.use(protectRoute);



router.get("/", (req, res) => {
    res.send("Project Route");
}); 

router.post("/addProject", addProject);
router.get("/getProjects", getProjects);

export default router;
