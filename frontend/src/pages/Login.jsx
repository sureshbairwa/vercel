import React, { useState, useEffect } from 'react';
import axios from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import authStore from '../store/authStore';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {authCheck} = authStore();


  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);

      console.log("login response->", response.data)
      if (response.status === 200) {
       
         await authCheck();
        
      
        toast.success("Login Successful", { duration: 4000 });
        navigate('/projects'); 
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message, { duration: 4000 });
      setError('Login failed. Please try again.');
    }


  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-black p-6 rounded-lg shadow-lg border border-amber-100">
      <div className='relative flex justify-end '>
        <p className=' cursor-pointer  ' onClick={handleCancel}>
          ❌
        </p>
      </div>
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-3 border border-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out cursor-pointer"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="">Don't have an account? <a href="/signup" className="text-indigo-500 hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
