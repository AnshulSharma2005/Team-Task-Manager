import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LogOut, PlusCircle } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [newProject, setNewProject] = useState("");

  const navigate = useNavigate();

  const API = "http://localhost:5000/api/tasks";

  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");

  // ================= FETCH =================

  const fetchTasks = async () => {
    try {
      let url = API;

      // 🔥 Member sees only assigned tasks
      if (userRole === "Member") {
        url = `${API}?assignedTo=${userEmail}`;
      }

      const res = await axios.get(url);
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks ❌");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch {
      toast.error("Failed to load projects ❌");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users ❌");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  // ================= ADD TASK =================

  const addTask = async () => {
    if (!title) return toast.error("Task title required ❌");
    if (!selectedProject) return toast.error("Select project ❌");
    if (!assignedTo) return toast.error("Assign user ❌");

    try {
      await axios.post(API, {
        title,
        status: "Pending",
        createdBy: userEmail,
        assignedTo,
        projectId: selectedProject,
        priority: "Medium",
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      });

      toast.success("Task added 🚀");
      setTitle("");
      fetchTasks();
    } catch {
      toast.error("Error adding task ❌");
    }
  };

  // ================= UPDATE =================

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/${id}`, { status });
      toast.success("Updated");
      fetchTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Deleted");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ================= PROJECT =================

  const createProject = async () => {
    if (!newProject) return toast.error("Enter project name ❌");

    try {
      await axios.post("http://localhost:5000/api/projects", {
        name: newProject,
        createdBy: userEmail
      });

      toast.success("Project created 🎉");
      setNewProject("");
      fetchProjects();
    } catch {
      toast.error("Error creating project");
    }
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    navigate("/");
  };

  // ================= LOGIC =================

  const filteredTasks = selectedProject
    ? tasks.filter((t) => t.projectId === selectedProject)
    : tasks;

  const completed = filteredTasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const pending = filteredTasks.length - completed;

  const isOverdue = (deadline) =>
    deadline && new Date(deadline) < new Date();

  // ================= UI =================

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#7c3aed] p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          🚀 Dashboard ({userRole})
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <Stat title="Total Tasks" value={filteredTasks.length} />
        <Stat title="Completed" value={completed} color="text-green-400" />
        <Stat title="Pending" value={pending} color="text-yellow-400" />
      </div>

      {/* ADMIN: CREATE PROJECT */}
      {userRole === "Admin" && (
        <div className="flex gap-3 mb-6">
          <input
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Create new project..."
            className="flex-1 bg-white/10 p-3 rounded-lg"
          />
          <button
            onClick={createProject}
            className="bg-purple-500 px-5 rounded-lg"
          >
            Create
          </button>
        </div>
      )}

      {/* PROJECT SELECT */}
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
        className="w-full bg-white/10 p-3 rounded-lg mb-6"
      >
        <option value="">All Projects</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* ADD TASK */}
      <div className="bg-[#0b1220]/80 p-5 rounded-xl flex gap-3 mb-8">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
          className="flex-1 bg-white/10 p-3 rounded-lg"
        />

        {/* ASSIGN USER */}
        {userRole === "Admin" && (
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="bg-white/10 p-3 rounded-lg"
          >
            <option value="">Assign user</option>
            {users.map((u) => (
              <option key={u._id} value={u.email}>
                {u.email}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={addTask}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 px-4 rounded-lg"
        >
          <PlusCircle />
        </button>
      </div>

      {/* TASK LIST */}
      <div className="grid gap-4">
        {filteredTasks.map((t) => (
          <div
            key={t._id}
            className="bg-[#0b1220]/80 p-5 rounded-xl flex justify-between items-center"
          >

            <div>
              <h3 className="font-semibold text-lg">{t.title}</h3>

              <p className="text-sm text-gray-400">
                Assigned: {t.assignedTo}
              </p>

              <p className="text-xs text-gray-400">
                Due: {new Date(t.deadline).toLocaleDateString()}
              </p>

              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  isOverdue(t.deadline)
                    ? "bg-red-500/20 text-red-400"
                    : t.status === "Completed"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {isOverdue(t.deadline) ? "Overdue 🔴" : t.status}
              </span>
            </div>

            <div className="flex gap-2">

              {t.status === "Pending" ? (
                <button
                  onClick={() => updateStatus(t._id, "Completed")}
                  className="bg-green-500 px-3 py-1 rounded"
                >
                  Done
                </button>
              ) : (
                <button
                  onClick={() => updateStatus(t._id, "Pending")}
                  className="bg-yellow-500 px-3 py-1 rounded"
                >
                  Undo
                </button>
              )}

              {userRole === "Admin" && (
                <button
                  onClick={() => deleteTask(t._id)}
                  className="bg-red-500 px-3 py-1 rounded"
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

// STAT CARD
const Stat = ({ title, value, color }) => (
  <div className="bg-[#0b1220]/80 p-5 rounded-xl">
    <p className="text-gray-400">{title}</p>
    <h2 className={`text-3xl font-bold ${color || ""}`}>{value}</h2>
  </div>
);