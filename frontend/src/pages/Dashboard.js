import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = "https://team-task-manager-production-3a08.up.railway.app/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [newProject, setNewProject] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    window.location.href = "/";
    return null;
  }

  // ✅ ONLY MEMBERS (fix)
  const filteredUsers = users.filter(
    (u) =>
      u.email &&
      u.email !== user.email &&
      u.role === "Member"
  );

  // ================= FETCH =================

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data || []);
  };

  const fetchProjects = async () => {
    const res = await axios.get(`${API}/projects`);
    setProjects(res.data || []);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users/all`);
    setUsers(res.data || []);
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  // ================= PROJECT =================

  const createProject = async () => {
    if (!newProject) return toast.error("Enter project name");

    await axios.post(`${API}/projects`, {
      name: newProject,
      createdBy: user.email,
    });

    toast.success("Project created 🚀");
    setNewProject("");
    fetchProjects();
  };

  // ================= ADD TASK =================

  const addTask = async () => {
    if (!title) return toast.error("Task cannot be empty");
    if (!selectedProject) return toast.error("Select project");

    // ✅ ADMIN MUST SELECT MEMBER
    if (user.role === "Admin" && !assignedTo) {
      return toast.error("Please assign a member ❌");
    }

    await axios.post(`${API}/tasks`, {
      title,
      projectId: selectedProject,
      assignedTo:
        user.role === "Admin"
          ? assignedTo // ✅ FIXED (no fallback)
          : user.email,
      createdBy: user.email,
      status: "Pending",
    });

    toast.success("Task added");
    setTitle("");
    setAssignedTo("");
    fetchTasks();
  };

  // ================= UPDATE =================

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/tasks/${id}`, { status });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  // ================= FILTER =================

  const filteredTasks = selectedProject
    ? tasks.filter((t) => t.projectId === selectedProject)
    : tasks;

  const completed = filteredTasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const pending = filteredTasks.length - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#7c3aed] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            🚀 Dashboard: {user.role}
          </h1>
          <p className="text-gray-300 text-sm">
            {user.name} (Currently logged in {user.role})
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Tasks" value={filteredTasks.length} />
        <Card title="Completed" value={completed} />
        <Card title="Pending" value={pending} />
      </div>

      {/* 👥 MEMBERS LIST */}
      {user.role === "Admin" && (
        <div className="mb-6 bg-[#0b1220]/80 p-4 rounded-xl text-white">
          <h2 className="font-semibold mb-2">Team Members</h2>

          {filteredUsers.length === 0 ? (
            <p className="text-gray-400">No members</p>
          ) : (
            filteredUsers.map((u) => (
              <p key={u._id}>
                • {u.name} ({u.email})
              </p>
            ))
          )}
        </div>
      )}

      {/* CREATE PROJECT */}
      {user.role === "Admin" && (
        <div className="flex gap-3 mb-4">
          <input
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Create new project..."
            className="flex-1 bg-[#1f2937] text-white px-3 py-3 rounded-lg"
          />
          <button
            onClick={createProject}
            className="bg-purple-500 px-4 rounded text-white"
          >
            Create
          </button>
        </div>
      )}

      {/* PROJECT SELECT */}
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
        className="w-full mb-4 bg-[#1f2937] text-white px-3 py-3 rounded-lg"
      >
        <option value="">All Projects</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* ADD TASK */}
      <div className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
          className="flex-1 bg-[#1f2937] text-white px-3 py-3 rounded-lg"
        />

        {user.role === "Admin" && (
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="bg-[#1f2937] text-white px-3 py-3 rounded-lg"
          >
            <option value="">Assign member</option>

            {filteredUsers.length === 0 ? (
              <option disabled>No members available</option>
            ) : (
              filteredUsers.map((u) => (
                <option key={u._id} value={u.email}>
                  {u.name} 
                </option>
              ))
            )}
          </select>
        )}

        <button
          onClick={addTask}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 px-5 rounded-lg text-white"
        >
          + Add
        </button>
      </div>

      {/* TASKS */}
      <div className="space-y-4">
        {filteredTasks.map((t) => (
          <div
            key={t._id}
            className="bg-[#0b1220]/80 p-5 rounded-xl flex justify-between"
          >
            <div>
              <h3 className="text-white">{t.title}</h3>
              <p className="text-gray-400 text-sm">
                Assigned: {t.assignedTo}
              </p>

              <span
                className={`px-2 py-1 text-xs rounded ${
                  t.status === "Completed"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {t.status}
              </span>
            </div>

            <div className="flex gap-2">
              {t.status !== "Completed" ? (
                <button
                  onClick={() =>
                    updateStatus(t._id, "Completed")
                  }
                  className="bg-green-500 px-3 py-1 rounded text-white"
                >
                  Done
                </button>
              ) : (
                <button
                  onClick={() =>
                    updateStatus(t._id, "Pending")
                  }
                  className="bg-yellow-500 px-3 py-1 rounded text-white"
                >
                  Undo
                </button>
              )}

              {user.role === "Admin" && (
                <button
                  onClick={() => deleteTask(t._id)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="bg-[#0b1220]/80 p-5 rounded-xl text-white">
    <p>{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);