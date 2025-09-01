export const calculateTotalHours = (tasks) => {
    return tasks.reduce((total, task) => total + task.horas, 0);
};

export const convertHoursToDays = (hours) => {
    return hours / 24;
};