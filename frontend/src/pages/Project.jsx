import React from 'react';

const Project = () => {
  const project = {
    projectName: "",
    deployId: "",
    description: "",
    logo: "", 
    hostedLink: "",
    githubURL: "",
    createdAt: "",
    updatedAt: "",
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center ">
      <div className="bg-gray-800 border-2 border-gray-700 text-white shadow-md rounded-lg p-6">
       
        <div className="flex items-center space-x-4">
         
          <img
            src={project.logo}
            alt={`${project.projectName} logo`}
            className="w-16 h-16 rounded-full"
          />
          
          <div>
            <h1 className="text-2xl font-bold">{project.projectName}</h1>
            <p className="">Deploy ID: {project.deployId}</p>
          </div>
        </div>

       
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="">{project.description || 'No description provided'}</p>
        </div>

        
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Hosted Link</h3>
            <a
              href={project.hostedLink}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.hostedLink}
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold">GitHub Repository</h3>
            <a
              href={project.githubURL}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.githubURL}
            </a>
          </div>
        </div>

     
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Timestamps</h3>
          <p className="">Created At: {new Date(project.createdAt).toLocaleString()}</p>
          <p className="">Updated At: {new Date(project.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Project;
