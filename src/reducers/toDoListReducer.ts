import {IToDoList, toDoListsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../store/store";


const initialState: ITodoListDomain[] = []

export type IFilter = 'all' | 'active' | 'completed'

export type ITodoListDomain = IToDoList & {
    filter: IFilter
}

export const toDoListReducer = (state: ITodoListDomain[] = initialState, action: toDoListReducerType): ITodoListDomain[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.payload.toDoLists.map(tl => ({
                ...tl,
                filter: "all"
            }))
        }
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
            return [{...action.payload.toDoList, filter: 'all'}, ...state]
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
    | SetToDoListsType

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

export type addToDoListActionType = ReturnType<typeof addToDoListAC>
export const addToDoListAC = (toDoList: IToDoList) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            toDoList
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

export type SetToDoListsType = ReturnType<typeof setToDoLists>
export const setToDoLists = (toDoLists: IToDoList[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            toDoLists
        }
    } as const
}

export const fetchToDoLists = () => (dispatch: Dispatch, getState: () => AppRootState, extraArgs: any) => {
    toDoListsAPI.getToDoLists()
        .then(res => dispatch(setToDoLists(res.data)))
}

export const addToDoListTC = (title: string) => (dispatch: Dispatch) => {
    toDoListsAPI.createToDoLists(title)
        .then(res => dispatch(addToDoListAC(res.data.data.item)))
}

export const removeToDoListTC = (toDoListId: string) => (dispatch: Dispatch) => {
    toDoListsAPI.deleteToDoLists(toDoListId)
        .then(res => dispatch(deleteToDoListAC(toDoListId)))
}

export const updateToDoListTC = (toDoListId: string, title: string) => (dispatch: Dispatch) => {
    toDoListsAPI.updateToDoLists(toDoListId, title)
        .then(res => dispatch(changeToDoListTitleAC(title, toDoListId)))
}