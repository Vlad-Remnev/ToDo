import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {ITasksState} from "../App";

const initialState: ITasksState = {}


export const tasksReducer = (state: ITasksState = initialState, action: taskReducerType): ITasksState => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(task => task.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            let newTask = {id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                description: '',
                todoListId: action.payload.todoListId,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low}
            return {
                ...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
            }
        }
        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId].map(task =>
                        task.id === action.payload.taskId ?
                            {...task, status: action.payload.status}
                            : task)
            }
        }
        case "CHANGE-TITLE": {
            console.log('actionTask', action)
            return {
                ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId].map(task =>
                        task.id === action.payload.taskId ?
                            {...task, title: action.payload.newTitle}
                            : task)

            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.id]: []}
        }
        case "DELETE-TODOLIST": {
            const {[action.payload.todolistId]: removedItem, ...updatedState} = state
            return updatedState

        }
        default:
            return state
    }
}

type taskReducerType =
    removeTaskActionType
    | addTaskActionType
    | changeStatusTaskActionType
    | changeTitleTaskActionType
    | addToDoListActionType
    | deleteToDoListActionType

export type removeTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id,
            todoListId: todoListId
        }
    } as const
}

export type addTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            todoListId: todoListId
        }
    } as const
}

export type changeStatusTaskActionType = ReturnType<typeof changeStatusTaskAC>
export const changeStatusTaskAC = (taskId: string, status: TaskStatuses, todoListId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            taskId: taskId,
            todoListId: todoListId,
            status
        }
    } as const
}

export type changeTitleTaskActionType = ReturnType<typeof changeTitleTaskAC>
export const changeTitleTaskAC = (taskId: string, newTitle: string, todoListId: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {
            taskId: taskId,
            newTitle: newTitle,
            todoListId: todoListId
        }
    } as const
}

export type addToDoListActionType = ReturnType<typeof addToDoListAC>
export const addToDoListAC = (title: string, id: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
            id: id
        }
    } as const
}
export type deleteToDoListActionType = ReturnType<typeof deleteToDoListAC>
export const deleteToDoListAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {
            todolistId: todolistId
        }
    } as const
}
