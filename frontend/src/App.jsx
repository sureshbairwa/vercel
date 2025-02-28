import DeployForm from "./pages/deploy"
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Projects from "./pages/projects"
import authStore from "./store/authStore"
import { useEffect } from "react"
import Project from "./pages/Project"
import projectStore from "./store/projectsStore"



function App() {

  const { user,authCheck } = authStore();
  const { getProjects } = projectStore();


  useEffect(() => {
    authCheck();
    getProjects();
    
  }, []);



  return (
    <>
      <div >
        <Navbar/>

        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/deploy" element={user?<DeployForm/>:<Login/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={user?<Project/>:<Login/>} />
        
        </Routes>
        <Toaster/>
      </div>
       
    </>
  )
}

export default App
