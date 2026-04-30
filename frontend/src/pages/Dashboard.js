import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LogOut, PlusCircle } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const API = "http://localhost:5000/api/tasks";

  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");

  // 🔥 FETCH TASKS (ROLE BASED)
  const fetchTasks = async () => {
    try {
      let url = API;

      // Member → only their tasks
      if (userRole === "Member") {
        url = `${API}?assignedTo=${userEmail}`;
      }

      const res = await axios.get(url);
      setTasks(res.data);

    } catch (err) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔥 ADD TASK
  const addTask = async () => {
    if (!title) return toast.error("Task cannot be empty");

    try {
      await axios.post(API, {
        title,
        status: "Pending",
        createdBy: userEmail,
        assignedTo: userEmail,
        projectId: "default-project",
        priority: "Medium",
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      });

      toast.success("Task added 🚀");
      setTitle("");
      fetchTasks();

    } catch (err) {
      toast.error("Error adding task ❌");
    }
  };

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/${id}`, { status });
      toast.success("Task updated");
      fetchTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  // 🔥 DELETE TASK (Admin only)
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    navigate("/");
  };

  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.length - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#7c3aed] p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          🚀 Dashboard ({userRole})
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <Stat title="Total Tasks" value={tasks.length} />
        <Stat title="Completed" value={completed} color="text-green-400" />
        <Stat title="Pending" value={pending} color="text-yellow-400" />
      </div>

      {/* ADD TASK */}
      <div className="bg-[#0b1220]/80 p-5 rounded-xl border border-white/10 flex gap-3 mb-8">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter new task..."
          className="flex-1 bg-white/10 p-3 rounded-lg outline-none"
        />

        <button
          onClick={addTask}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-2 rounded-lg"
        >
          <PlusCircle size={18} />
        </button>
      </div>

      {/* TASK LIST */}
      <div className="grid gap-4">
        {tasks.map(t => (
          <div key={t._id}
            className="bg-[#0b1220]/80 p-5 rounded-xl flex justify-between items-center">

            <div>
              <h3 className="text-lg">{t.title}</h3>

              <p className="text-sm text-gray-400">
                Assigned: {t.assignedTo}
              </p>

              <span className={`text-sm ${
                t.status === "Completed"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}>
                {t.status}
              </span>
            </div>

            <div className="flex gap-2">

              {/* STATUS BUTTON */}
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

              {/* DELETE ONLY FOR ADMIN */}
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

// 🔥 Reusable stat component
const Stat = ({ title, value, color }) => (
  <div className="bg-[#0b1220]/80 p-5 rounded-xl">
    <p className="text-gray-400">{title}</p>
    <h2 className={`text-3xl font-bold ${color || ""}`}>{value}</h2>
  </div>
);