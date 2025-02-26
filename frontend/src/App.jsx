import DeployForm from "./deploy"
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Projects from "./pages/projects"
import authStore from "./store/authStore"
import { useEffect } from "react"
import Project from "./pages/Project"


function App() {



  return (
    <>
      <div >
        <Navbar/>

        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/deploy" element={<DeployForm />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Project />} />
        
        </Routes>
        <Toaster/>
      </div>
       
    </>
  )
}

export default App
