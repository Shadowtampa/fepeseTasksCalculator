export interface Task {
    id: string;
    code: string; // Código da tarefa
    title: string; // Nome da tarefa
    environments: string[];
    hours: number;
    status: 'todo' | 'doing' | 'done'; // Status da tarefa
    description: string; // Descrição da tarefa
    type: string; // Tipo da tarefa (História, Bug, Tarefa, etc.)
}