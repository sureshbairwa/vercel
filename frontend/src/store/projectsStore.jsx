
import { create } from "zustand";
import axiosInstance from "../lib/axios";

const projectStore = create((set) => ({
    projects: [],
    
    getProjects:async () => {
          try {
            const response = await axiosInstance.get("/api/projects/getProjects");
           
            set({ projects: response.data.projects || [] });
           
            console.log(projects);
          } catch (err) {
            console.log(err);
          }
        }
      
}));

export default projectStore;