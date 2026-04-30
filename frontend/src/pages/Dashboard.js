import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = () => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (!title) return;

    axios.post('http://localhost:5000/api/tasks', {
      title,
      status: "Pending"
    }).then(() => {
      setTitle("");
      fetchTasks();
    });
  };

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/tasks/${id}`, { status })
      .then(fetchTasks);
  };

  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.length - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        🚀 Team Task Manager
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-2xl font-bold">{tasks.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-2xl font-bold text-green-600">{completed}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-2xl font-bold text-yellow-600">{pending}</p>
        </div>

      </div>

      {/* ADD TASK */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter new task..."
          className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
        >
          + Add
        </button>
      </div>

      {/* TASK LIST */}
      <div className="grid gap-4">
        {tasks.map(t => (
          <div
            key={t._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{t.title}</h3>
              <p className={`text-sm ${
                t.status === "Completed" ? "text-green-600" : "text-yellow-600"
              }`}>
                {t.status}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(t._id, "Completed")}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Done
              </button>

              <button
                onClick={() => updateStatus(t._id, "Pending")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Pending
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}