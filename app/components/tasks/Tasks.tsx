import { TaskItem } from "@/app/interfaces";
import { Dispatch, SetStateAction } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

interface ITasksProps {
  tasks: TaskItem[];
  showModal: boolean;
  editingTask: TaskItem | null;
  formData: Partial<TaskItem>;
  handleDelete: (id: number) => Promise<void>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setEditingTask: Dispatch<SetStateAction<TaskItem | null>>;
  setFormData: Dispatch<SetStateAction<Partial<TaskItem>>>;
}

export default function Tasks({
  tasks,
  showModal,
  editingTask,
  formData,
  handleDelete,
  handleSubmit,
  setShowModal,
  setEditingTask,
  setFormData,
}: ITasksProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FiPlus /> Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 text-black">{task.title}</td>
                  <td className="px-6 py-4 text-black">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {task.isCompleted ? (
                      <span className="text-green-600">Completed</span>
                    ) : (
                      <span className="text-red-600">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingTask(task);
                        setFormData(task);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4 text-black">
                {editingTask ? "Edit Task" : "New Task"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-black"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Description
                    </label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-black"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black ">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-black"
                      value={
                        formData.dueDate
                          ? new Date(formData.dueDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Priority
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-black"
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value as "Low" | "Medium" | "High",
                        })
                      }
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isCompleted}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isCompleted: e.target.checked,
                        })
                      }
                      className="rounded text-blue-600"
                    />
                    <label className="text-sm text-black">Completed</label>
                  </div>
                </div>
                <div className="mt-6 flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingTask(null);
                      setFormData({
                        title: "",
                        description: "",
                        dueDate: "",
                        priority: "Low",
                        isCompleted: false,
                      });
                    }}
                    className="px-4 py-2 text-black hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingTask ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
