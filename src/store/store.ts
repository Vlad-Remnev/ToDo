import {applyMiddleware, combineReducers, createStore} from "redux";
import {toDoListReducer} from "../reducers/toDoListReducer";
import {tasksReducer} from "../reducers/taskReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: toDoListReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store