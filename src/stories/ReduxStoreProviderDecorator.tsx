import React from "react";
import {Provider} from "react-redux";
import {AppRootState, store} from "../store/store";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../reducers/taskReducer";
import {toDoListReducer} from "../reducers/toDoListReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolist1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolist2', title: 'What to do', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolist1']: [
            {
                id: v1(), title: 'HTML & CSS', status: TaskStatuses.New,
                description: '',
                todoListId: 'todolist1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'React', status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolist1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolist1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ],
        ['todolist2']: [
            {
                id: v1(), title: 'Play', status: TaskStatuses.New,
                description: '',
                todoListId: 'todolist1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Walk', status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolist1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Study', status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolist1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}