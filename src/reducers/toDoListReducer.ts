import {addToDoListActionType, deleteToDoListActionType} from "./taskReducer";
import {IToDoList} from "../api/todolists-api";


const initialState: ITodoListDomain[] = []

export type IFilter = 'all' | 'active' | 'completed'

export type ITodoListDomain = IToDoList & {
    filter: IFilter
}

export const toDoListReducer = (state: ITodoListDomain[] = initialState, action: toDoListReducerType): ITodoListDomain[] => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(todoList => todoList.id === action.payload.todoListId ?
                {...todoList, filter: action.payload.value}
                : todoList)
        }
        case "CHANGE-TODOLIST": {
            console.log('actionTodo', action)
            return state.map(todolist => todolist.id === action.payload.todoListId ?
                {...todolist, title: action.payload.newTitle}
                : todolist)
        }
        case "ADD-TODOLIST": {
            let newToDo: ITodoListDomain = {id: action.payload.id, title: action.payload.title, filter: 'all', addedDate: '', order: 0}
            return [newToDo, ...state]
        }
        case "DELETE-TODOLIST": {
            return state.filter(todoList => todoList.id !== action.payload.todolistId)
        }
        default:
            return state
    }
}

export type toDoListReducerType =
    filterToDOListActionType
    | deleteToDoListActionType
    | changeToDoListTitleActionType
    | addToDoListActionType

export type filterToDOListActionType = ReturnType<typeof filterToDOListAC>
export const filterToDOListAC = (value: IFilter, todoListId: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            value: value,
            todoListId: todoListId
        }
    } as const
}

export type changeToDoListTitleActionType = ReturnType<typeof changeToDoListTitleAC>
export const changeToDoListTitleAC = (newTitle: string, todoListId: string) => {
    return {
        type: 'CHANGE-TODOLIST',
        payload: {
            newTitle: newTitle,
            todoListId: todoListId
        }
    } as const
}