"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tasks } from "@/app/components";
import { TaskItem } from "@/app/interfaces";
import { API_ENDPOINTS } from "@/app/API_ENDPOINTS";

export default function TasksContainer() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [formData, setFormData] = useState<Partial<TaskItem>>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    isCompleted: false,
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get<TaskItem[]>(API_ENDPOINTS.tasks.API_URL);
      if (response) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const submitPayload = () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      ...(formData.dueDate && {
        dueDate: new Date(formData.dueDate).toISOString(),
      }),
      priority: formData.priority,
      isCompleted: formData.isCompleted,
    };

    return payload;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(
          `${API_ENDPOINTS.tasks.API_URL}/${editingTask.id}`,
          submitPayload()
        );
      } else {
        await axios.post(API_ENDPOINTS.tasks.API_URL, submitPayload());
      }
      setShowModal(false);
      setEditingTask(null);
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        isCompleted: false,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_ENDPOINTS.tasks.API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <Tasks
        tasks={tasks}
        showModal={showModal}
        editingTask={editingTask}
        formData={formData}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        setShowModal={setShowModal}
        setEditingTask={setEditingTask}
        setFormData={setFormData}
      />
    </div>
  );
}
