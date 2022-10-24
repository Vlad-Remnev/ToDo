import {ITask, TaskPriorities, TaskStatuses, toDoListsAPI, UpdateTaskModel} from "../api/todolists-api";
import {ITasksState} from "../App";
import {addToDoListActionType, deleteToDoListActionType, SetToDoListsType} from "./toDoListReducer";
import {Dispatch} from "redux";
import {AppRootState} from "../store/store";

const initialState: ITasksState = {}


export const tasksReducer = (state: ITasksState = initialState, action: taskReducerType): ITasksState => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.payload.toDoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.payload.id]: action.payload.tasks}
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(task => task.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            return {
                ...state, [action.payload.todoListId]: [action.payload.task, ...state[action.payload.todoListId]]
            }
        }
        case "UPDATE-TASK": {
            return {...state, [action.payload.todoListId]:
                    state[action.payload.todoListId].map(el => (
                        el.id === action.payload.taskId
                            ? {...el, ...action.payload.task}
                            :el
                    ))}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.toDoList.id]: []}
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
    | updateTaskActionType
    | addToDoListActionType
    | deleteToDoListActionType
    | SetToDoListsType
    | SetTasksType

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
export const addTaskAC = (task: ITask, todoListId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task,
            todoListId
        }
    } as const
}

export type updateTaskActionType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (taskId: string, task: ITask, todoListId: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            taskId,
            todoListId,
            task
        }
    } as const
}

export type SetTasksType = ReturnType<typeof setTasks>
export const setTasks = (tasks: ITask[], id: string) => {
    return {
        type: 'SET-TASKS',
        payload: {
            tasks,
            id
        }
    } as const
}

//THUNK
export const fetchTasks = (todolistId: string) => (dispatch: Dispatch) => {
    toDoListsAPI.getTasks(todolistId)
        .then(res => dispatch(setTasks(res.data.items, todolistId)))
}

export const removeTaskTC = (id: string, todoListId: string) => (dispatch: Dispatch) => {
    toDoListsAPI.deleteTask(todoListId, id)
        .then(res => dispatch(removeTaskAC(id, todoListId)))
}

export const addTaskTC = (title: string, toDoListId: string) => (dispatch: Dispatch) => {
    toDoListsAPI.createTask(toDoListId, title)
        .then(res => dispatch(addTaskAC(res.data.data.item, toDoListId)))
}

export type UpdateTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (toDoListId: string, taskId: string, values: UpdateTaskType) => (dispatch: Dispatch, getState: () => AppRootState) => {
    const task = getState().tasks[toDoListId].find(task => task.id === taskId)
    if (task) {
        const model: UpdateTaskModel = {
            ...task,
            ...values
        }
        toDoListsAPI.updateTask(toDoListId, taskId, model)
            .then(res => {
                dispatch(updateTaskAC(taskId, res.data.data.item, toDoListId))
            })
    }
}

