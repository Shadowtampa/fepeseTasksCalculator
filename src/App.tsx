import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskStats from "./components/TaskStats";
import TaskList from "./components/TaskList";
import styles from "./App.module.css";
import { parseXMLToTask } from "./utils/xmlParser";
import type { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [xmlString, setXmlString] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const updateTaskHours = (taskId: string, hours: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, hours } : task))
    );
  };

  const updateTaskStatus = (
    taskId: string,
    status: "todo" | "doing" | "done"
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const importTasksFromXML = (xmlString: string) => {
    const newTask = parseXMLToTask(xmlString);

    if (newTask) addTask(newTask);
  };

  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0);
  const totalDays = totalHours / 8;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.importContainer}>
        <textarea
          placeholder="Cole o XML aqui"
          className={styles.xmlInput}
          value={xmlString}
          onChange={(e) => setXmlString(e.target.value)}
        ></textarea>
        <button onClick={() => importTasksFromXML(xmlString)}>
          Importar XML
        </button>
      </div>
      <div className={styles.statsRow}>
        <TaskStats
          totalHours={totalHours}
          totalDays={totalDays}
          tasks={tasks}
        />
      </div>
      <div className={styles.taskListContainer}>
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          updateTaskHours={updateTaskHours}
          updateTaskStatus={updateTaskStatus}
        />
      </div>
    </div>
  );
};

export default App;
