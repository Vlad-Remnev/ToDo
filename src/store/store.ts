import {combineReducers, createStore} from "redux";
import {toDoListReducer} from "../reducers/toDoListReducer";
import {tasksReducer} from "../reducers/taskReducer";

const rootReducer = combineReducers({
    todolists: toDoListReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store