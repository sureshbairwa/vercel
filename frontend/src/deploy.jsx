import React, { useState } from 'react';
import axiosInstance from './lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DeployForm = () => {
  const [repoURL, setrepoURL] = useState('');
  const [projectName,setprojectName] = useState('');
  const [deploymentId, setDeploymentId] = useState('');
  const [error, setError] = useState('');
  const [status,setStatus] = useState('Deploy')

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setStatus("Deploying")

        console.log("repo-> ",repoURL,projectName)
        console.log(repoURL)
      const response = await axiosInstance.post('http://localhost:5000/api/projects/addProject', { projectName,repoURL });
      if (response.data.success === true) {
        setDeploymentId(response.data.project.deployId);
        setStatus("Deployed")
        toast.success("Deployment Successful", { duration: 4000 });
        navigate('/projects');
        // setError('');
      } else {
        toast.error(response.data.message, { duration: 4000 });
        throw new Error('Invalid response');
      }
    } catch (err) {
      toast.error(err.response.data.message, { duration: 4000 });
      setError('Deployment failed. Please try again.');
      setStatus("Deploy")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r bg-gray-900 ">
      <h1 className="text-4xl text-white font-bold mb-6">Deploy Your GitHub Repository</h1>
      <form onSubmit={handleSubmit} className="w-3/4 max-w-md bg-gray-800  border-2  border-gray-500 rounded-lg shadow-lg p-6 text-white">

      <div className="mb-4">
          <label htmlFor="projectName" className="block  font-bold mb-2">Project Name</label>
          <input
            type="text"
            id="projectName"
            className="w-full p-3 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setprojectName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="repoURL" className="block text-white font-bold mb-2">GitHub Repo Link</label>
          <input
            type="url"
            id="repoURL"
            className="w-full p-3 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter GitHub Repo URL"
            value={repoURL}
            onChange={(e) => setrepoURL(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className={`w-full text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out ${
            status === 'Deploying' ? 'bg-indigo-200 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
          disabled={status === 'Deploying'} 
        >
          {status}
        </button>
      </form>

      {deploymentId && (
        <div className="mt-8 text-white">
          <p>Your website is hosted at:</p>
          <a
            href={`http://localhost:3001/${deploymentId}/index.html`}
            className="text-yellow-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://localhost:3001/{deploymentId}/index.html
          </a>
        </div>
      )}
    </div>
  );
};

export default DeployForm;
