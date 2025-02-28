import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";




const authStore = create((set) => ({

    user: null,
    setUser: (user) => set({ user }),
    logout: async () => {
        try {
            const response = await axiosInstance.post("/api/auth/logout");
            if (response.status === 200) {
                
                toast.success("Logout Successful")
                
                set({ user: null });
                window.location.reload();
                
            }
        } catch (error) {
            console.log(error);
        }
    },
    authCheck: async() => {

        try {

            const response = await axiosInstance.get('/api/auth/authCheck');

            console.log("user",response.data)
            if (response.status === 200) {
                set({ user: response.data.user });
            }

            
        } catch (error) {

            console.log(error);
            
        }
        
    }
}));

export default authStore;