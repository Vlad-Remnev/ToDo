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
    createToDoLists() {
        return instance.post<ResponseType<{item: IToDoList}>>(`todo-lists`, {title: 'REACTJS'})
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
        return instance.post<ResponseType<ITask>>(`todo-lists/${toDoListId}/tasks`, {title})
    },
    deleteTask(toDoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${toDoListId}/tasks/${taskId}`)
    },
    updateTask(toDoListId: string, taskId: string, title: string) {
        return instance.put<UpdateTask>(`todo-lists/${toDoListId}/tasks/${taskId}`, {title})
    }
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
export interface UpdateTask {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}