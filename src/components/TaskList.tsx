import React from 'react';
import styles from './TaskList.module.css';
import TaskItem from './TaskItem';
import type { Task } from '../types';

interface TaskListProps {
    tasks: Task[];
    deleteTask: (taskId: string) => void;
    updateTaskHours: (taskId: string, hours: number) => void;
    updateTaskStatus: (taskId: string, status: 'todo' | 'doing' | 'done') => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, updateTaskHours, updateTaskStatus }) => {
    return (
        <ul className={styles.taskList}>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    updateTaskHours={updateTaskHours}
                    updateTaskStatus={updateTaskStatus}
                />
            ))}
        </ul>
    );
};

export default TaskList;