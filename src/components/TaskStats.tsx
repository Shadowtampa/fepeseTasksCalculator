import React from 'react';
import styles from './TaskStats.module.css';

interface TaskStatsProps {
    totalHours: number;
    totalDays: number;
    tasks: { status: 'todo' | 'doing' | 'done' }[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ totalHours, totalDays, tasks}) => {

    tasks.map(task => task.status === undefined ? task.status = 'todo' : task.status);

    const todoCount = tasks.filter(task => task.status === 'todo').length;
    const doingCount = tasks.filter(task => task.status === 'doing').length;
    const doneCount = tasks.filter(task => task.status === 'done').length;

    return (
        <div className={styles.statsRow}>
            <div className={styles.stats}>
                <h2>Andamento</h2>
                <p>To Do: {todoCount}</p>
                <p>Doing: {doingCount}</p>
                <p>Done: {doneCount}</p>
            </div>
            <div className={styles.totalizers}>
                <h2>Totalizadores</h2>
                <p>Total de Horas: <span className={styles.totalValue}>{totalHours}</span></p>
                <p>Total em Dias: <span className={styles.totalValue}>{totalDays.toFixed(2)}</span></p>
            </div>
        </div>
    );
};

export default TaskStats;