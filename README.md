# 🚀 Team Task Manager (Full-Stack)

A full-stack web application that allows teams to create projects, assign tasks, and track progress with **role-based access (Admin & Member)**.

---

## 🌐 Live Application
👉 https://your-frontend-url.com  

---

## 📂 GitHub Repository
👉 https://github.com/your-username/your-repo-name  

---

## 🎯 Features

### 🔐 Authentication
- User Signup & Login using Firebase
- Secure authentication flow
- Role-based access (Admin / Member)

### 👥 Role-Based Access
- **Admin**
  - Create projects
  - View all team members
  - Assign tasks to members
  - Delete tasks
- **Member**
  - View assigned tasks
  - Mark tasks as completed

### 📁 Project Management
- Create multiple projects
- View tasks project-wise

### ✅ Task Management
- Create tasks
- Assign tasks to specific members
- Track status (Pending / Completed)

### 📊 Dashboard
- Total tasks count
- Completed tasks
- Pending tasks
- Dynamic updates in real-time

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Firebase Authentication

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Deployment
- Backend: Railway 🚂
- Frontend: Vercel / Netlify 🌐

---

## ⚙️ Environment Variables

### Backend (.env)
PORT = 5000 🚂
MONGO_URL = mongodb://anshulsharma09082022_db_user:kr7BzFIKttJQg4Y7@ac-jpfiv3v-shard-00-00.rlf5unl.mongodb.net:27017,ac-jpfiv3v-shard-00-01.rlf5unl.mongodb.net:27017,ac-jpfiv3v-shard-00-02.rlf5unl.mongodb.net:27017/taskmanager?ssl=true&replicaSet=atlas-bipa4e-shard-0&authSource=admin&retryWrites=true&w=majority


### Frontend

REACT_APP_API_URL=https://your-backend-url/api


---

## 🚀 Installation & Setup (Local)

### 1. Clone the repository

git clone https://github.com/AnshulSharma2005/Team-Task-Manager.git

cd Team-Task-Manager


---

### 2. Backend Setup

cd backend
npm install
npm start


---

### 3. Frontend Setup

cd frontend
npm install
npm start


---

## 🔄 API Endpoints

### User Routes
- `POST /api/users/signup` → Register user  
- `GET /api/users/:email` → Get user by email  
- `GET /api/users/all` → Get all users  

### Task Routes
- `POST /api/tasks` → Create task  
- `GET /api/tasks` → Get all tasks  
- `PUT /api/tasks/:id` → Update task status  
- `DELETE /api/tasks/:id` → Delete task  

---

## 📸 Demo Flow

1. User Signup/Login  
2. Admin Dashboard  
3. Create Project  
4. Assign Task to Member  
5. Member Login  
6. View Assigned Task  
7. Mark Task as Completed  
8. Dashboard updates automatically  

---

## 📦 Submission Details

- ✔ Live Application URL  
- ✔ GitHub Repository  
- ✔ README File  
- ✔ Demo Video (2–5 min)  

---

## ⚠️ Notes
- Make sure backend is deployed on Railway
- Replace API URLs with live backend URL
- Do not use localhost in production

---

## 👨‍💻 Author
Anshul Sharma  

---

## ⭐ Acknowledgement
This project was built as part of a full-stack assignment to demonstrate real-world development skills including authentication, API integration, and role-based access control.