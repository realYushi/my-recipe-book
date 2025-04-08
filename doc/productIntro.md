# **My Recipe Book – Product Introduction**  

**My Recipe Book** is a simple web app that helps users:  
- **Save & manage recipes** (add, edit, delete).  
- **Check ingredient prices** from nearby supermarkets.  

### **Key Features**  
✔ **Recipe CRUD** – Store and organize your recipes.  
✔ **Price Lookup** – See real-time (or estimated) grocery costs.  

### **Technical Stack**
🔧 **Modern Web Application Stack**
- **MongoDB** – NoSQL database for flexible recipe storage
- **Express.js** – Backend API framework
- **React** (v19) – Frontend user interface with React Router v7
- **Node.js** – Runtime environment
- **TailwindCSS** (v4) – For responsive styling
- **TypeScript** – For type-safe frontend development

### **Development Environment**
🐳 **Docker Configuration**
- Containerized development environment with three services:
  - Frontend (React with Vite)
  - Backend (Node/Express)
  - Database (MongoDB)
- Docker Compose for orchestration
- Hot reloading enabled for both frontend and backend

### **Architecture Overview**
```frontend/``` – React v19 application using React Router
```backend/``` – Express API server with Mongoose ODM
