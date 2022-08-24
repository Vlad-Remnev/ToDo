import {IFilter, IToDoLists} from "../App";
import {addToDoListActionType, deleteToDoListActionType} from "./taskReducer";


const initialState: IToDoLists[] = []

export const toDoListReducer = (state: IToDoLists[] = initialState, action: toDoListReducer) => {
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
            let newToDo: IToDoLists = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [newToDo, ...state]
        }
        case "DELETE-TODOLIST": {
            return state.filter(todoList => todoList.id !== action.payload.todolistId)
        }
        default:
            return state
    }
}

type toDoListReducer =
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