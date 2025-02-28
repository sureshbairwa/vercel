import React, { useState,useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import toast from 'react-hot-toast';
import authStore from '../store/authStore';


const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const {authCheck} = authStore();



  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', formData);
      console.log(response.data)
      
    
      if (response.data.success===true) {
       
          authCheck();
       
        toast.success("Signup Successful", { duration: 4000 });
        // console.log(data.message)
        navigate('/projects'); // 
      }else{
        toast.error(response.data.message ,{ duration: 4000 });
      }
    } catch (err) {
      console.log("error ",err.response.data.message)
      toast.error(err.response.data.message, { duration: 4000 });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-black p-6 rounded-lg shadow-lg border border-amber-100">

      <div className='relative flex justify-end'>
        <p className=' cursor-pointer ' onClick={handleCancel}>
          ❌
        </p>
      </div>

        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block  font-bold mb-2">Email</label>
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
            <label htmlFor="username" className="block  font-bold mb-2">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block  font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block  font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-500 hover:underline">
            Login
          </a>
        </p>
      </div>
      
    </div>
  );
};

export default Signup;
