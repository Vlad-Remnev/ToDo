import axios from "axios";

export interface IToDoList {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export interface ITask {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

interface GetTasksResponse {
    error: string | null
    totalCount: number
    items: ITask[]
}

interface ResponseType<T = {}> {
    resultCode: number
    messages: string[]
    data: T
}
export interface UpdateTaskModel {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": 'cbcee176-7eb2-4a97-9122-df66bf35b024'
    }
})

export const toDoListsAPI = {
    getToDoLists() {
        return instance.get<IToDoList[]>(`todo-lists`)
    },
    createToDoLists(title: string) {
        return instance.post<ResponseType<{item: IToDoList}>>(`todo-lists`, {title})
    },
    deleteToDoLists(toDoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${toDoListId}`)
    },
    updateToDoLists(toDoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${toDoListId}`, {title})
    },
    getTasks(toDoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${toDoListId}/tasks`)
    },
    createTask(toDoListId: string, title: string) {
        return instance.post<ResponseType<{item: ITask}>>(`todo-lists/${toDoListId}/tasks`, {title})
    },
    deleteTask(toDoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${toDoListId}/tasks/${taskId}`)
    },
    updateTask(toDoListId: string, taskId: string, model: UpdateTaskModel) {
        return instance.put<ResponseType<{item: ITask}>>(`todo-lists/${toDoListId}/tasks/${taskId}`, model)
    }
}