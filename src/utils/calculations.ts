import type { Task } from "../types";

export const calculateTotalHours = (tasks : Task[]) => {
    return tasks.reduce((total, task) => total + task.hours, 0);
};

export const convertHoursToDays = (hours : number) => {
    return hours / 24;
};