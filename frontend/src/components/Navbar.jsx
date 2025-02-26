import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import authStore from '../store/authStore';
import githubLogo from '../assets/github-mark-white.svg';
// import { useEffect } from 'react';


const Navbar = () => {

  const { user,authCheck,logout } = authStore();

  useEffect(() => {
    authCheck();
  },[]);
  


  




  

  const isLoggedIn = user?true:false; 


  return (
    <nav className="bg-black border-b-2 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        
        
        <div className="flex items-center space-x-2">
          <Link to="/" className='flex items-center justify-between'>
          <svg
                                    width="35"
                                   height="35"
                              viewBox="0 0 76 65"
                  fill="none" xmlns="http://www.w3.org/2000/svg"><path
            d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#ffffff"/></svg>
           
          
          <h1 className="  pl-2 text-xl font-bold text-indigo-600">Vercel Clone</h1>
          </Link>
        </div>

       
        <div className="flex items-center space-x-4 text-gray-300 font-bold">
          
          <Link to="https://github.com/sureshbairwa/test-web" className=" hover:text-indigo-600 hover:underline">
            <img src={githubLogo} width={35} />
          </Link>

        
          {isLoggedIn && (
            <Link to="/projects" className=" hover:text-indigo-600 hover:underline">
              Projects
            </Link>
          )}

         
          <Link
            to="/deploy"
            className="bg-indigo-600 text-gray-50  hover:text-black  px-4 py-2 rounded-lg hover:bg-indigo-500"
          >
            Deploy
          </Link>
          {!isLoggedIn ? (
            <>
           
              <Link to="/signup" className=" hover:text-indigo-600 hover:underline">
                Sign Up
              </Link>
              
              
              <Link to="/login" className=" hover:text-indigo-600 hover:underline">
                Login
              </Link>
            </>
          ) : (
            <div className="relative">
             
              <button onClick={()=>logout()} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none cursor-pointer hover:text-black ">
                Logout
              </button>

              
            </div>
          )}

          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
