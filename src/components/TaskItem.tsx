import React, { useState } from 'react';
import styles from './TaskItem.module.css';
import type { Task } from '../types';

interface TaskItemProps {
    task: Task;
    deleteTask: (taskId: string) => void;
    updateTaskHours: (taskId: string, hours: number) => void;
    updateTaskStatus: (taskId: string, status: 'todo' | 'doing' | 'done') => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, updateTaskHours, updateTaskStatus }) => {
    const [showDescription, setShowDescription] = useState(false);

    const handleHoursChange = (hours: string) => {
        const parsedHours = parseFloat(hours);
        if (!isNaN(parsedHours)) {
            updateTaskHours(task.id, parsedHours);
        }
    };

    return (
        <li className={styles.taskItem}>
            <h3>{task.title}</h3>
            <p>
                Jira Link: 
                <a
                    href={`https://localhost.labtrans.ufsc.br:3010/browse/${task.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {task.code}
                </a>
            </p>
            <p>Type: {task.type}</p>

            <button 
                className={styles.toggleDescriptionBtn} 
                onClick={() => setShowDescription(!showDescription)}
            >
                {showDescription ? 'Esconder descrição ▲' : 'Mostrar descrição ▼'}
            </button>

            {showDescription && (
                <div className={styles.description}>
                    <strong>Description:</strong>
                    <div 
                        dangerouslySetInnerHTML={{ __html: task.description }} 
                    />
                </div>
            )}

            <p>Environments: {task.environments.join(', ')}</p>
            <p>
                Horas: 
                <input
                    type="number"
                    value={task.hours}
                    onChange={(e) => handleHoursChange(e.target.value)}
                />
            </p>
            <p>
                Status: 
                <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as 'todo' | 'doing' | 'done')}
                >
                    <option value="todo">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    );
};

export default TaskItem;
