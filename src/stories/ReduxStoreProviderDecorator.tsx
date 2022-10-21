import React from "react";
import {Provider} from "react-redux";
import {AppRootState, store} from "../store/store";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../reducers/taskReducer";
import {toDoListReducer} from "../reducers/toDoListReducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolist1', title: 'What to learn', filter: 'all'},
        {id: 'todolist2', title: 'What to do', filter: 'all'}
    ],
    tasks: {
        ['todolist1']: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        ['todolist2']: [
            {id: v1(), title: 'Play', isDone: false},
            {id: v1(), title: 'Relax', isDone: false},
            {id: v1(), title: 'Take it easy', isDone: true},
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}