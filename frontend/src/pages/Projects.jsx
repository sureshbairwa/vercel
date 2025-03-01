import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import githubLogo from "../assets/github-mark-white.svg";
import axiosInstance from "../lib/axios";
import projectStore from "../store/projectsStore.jsx";
import { useEffect } from "react";

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  // const [projects, setProjects] = useState([]);

  const {projects,getProjects} = projectStore();
  
  useEffect(() => {
    getProjects();
  }, []);

  console.log(projects);

  const filteredProjects = projects
    .filter((project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.projectName.localeCompare(b.projectName);
      } else if (sortOption === "date") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else {
        return 0;
      }
    });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleAddProject = () => navigate("/deploy");

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-10">
      <div className="container mx-auto px-4">
        {/* Search Box, Sort Dropdown, and Add Project Button */}
        <div className="flex  items-center mb-8">
         
            <input
              type="text"
              placeholder="Search projects..."
              className="w-1/2  bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-black"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <select
              className="ml-4 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-black"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="name">Sort by name</option>
              <option value="date">Sort by activity</option>
            </select>
          

          <button
            className="cursor-pointer ml-auto bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg focus:outline-none transition duration-300"
            onClick={handleAddProject}
          >
            Add Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-black text-white p-6 pb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={logo}
                  alt={`${project.projectName} logo`}
                  className="w-12 h-12 object-fit"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {project.projectName}
                  </h3>
                  <a
                    href={project.hostedLink}
                    className="text-gray-400 hover:underline break-all overflow-wrap break-word"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.hostedLink}
                  </a>

                </div>
              </div>

              <p className="text-white mb-2 flex items-center space-x-2">
                <img src={githubLogo} width={30} alt="GitHub" />
                <a
                  href={project.githubURL}
                  className="text-white hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.githubURL}
                </a>
              </p>
              <p className="text-white mt-5">
                <strong>Last Updated: </strong>
                {project.updatedAt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
