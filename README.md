
# Vercel Clone

Welcome to the **Vercel Clone** project! This is a simplified version of Vercel, providing static site hosting for React applications. We use a modern tech stack, including AWS S3, Docker, Redis, MongoDB, and more, to efficiently host React apps.

---

## Tech Stack

<div style="text-align: center;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS Logo" width="150" style="margin: 10px; display: inline-block;" />
  <img src="https://cdn.worldvectorlogo.com/logos/docker-4.svg" width="150" style="margin: 10px; display: inline-block;" />
  <img src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg" width="150" style="margin: 10px; display: inline-block;" />
  <img src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" width="150" style="margin: 10px; display: inline-block;" />
  <img src="https://cdn.worldvectorlogo.com/logos/redis.svg" width="150" style="margin: 10px; display: inline-block;" />
  <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" width="150" style="margin: 10px; display: inline-block;" />
  <img src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" width="150" style="margin: 10px; display: inline-block;" />
 <img src="https://github.com/pmndrs/zustand/blob/HEAD/docs/bear.jpg" width="150" style="margin: 10px; display: inline-block;" />

</div>

---

### How It Works
This project allows you to host static sites (React applications) by leveraging cloud infrastructure and containerization. Here's a quick overview of how everything works:

- **AWS S3** is used for object storage to store your build/dist folders after building the React app.
- **Docker** ensures that the React app is built in a clean, isolated environment.
- **Redis Queue** helps with task management, processing each project build asynchronously.
- **MongoDB** is the primary database, storing project and user information.
- **React** powers the frontend of the platform.
- **Tailwind CSS** handles the styling of the frontend.
- **Node.js (Express)** serves as the backend framework, managing API requests and handling all server-side operations.
---

### Key Features
- **Efficient Hosting:** Host static React apps easily, with automatic deployment.
- **Containerized Builds:** Use Docker to create isolated, consistent build environments for each project.
- **Asynchronous Build Processing:** Handle multiple projects with Redis queues, ensuring smooth build processing.
- **Scalable Object Storage:** AWS S3 serves as the file storage solution, capable of handling large datasets.
- **Modern UI:** Powered by React and styled with Tailwind CSS for a responsive, sleek frontend.

---


