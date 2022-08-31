import React, {useReducer, useState} from 'react';
import './App.css';
import {ITasks, Todo} from "./components/Todo";
import {v1} from "uuid";
import {InputText} from "./components/InputText/InputText";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTaskAC,
    addToDoListAC,
    changeStatusTaskAC,
    changeTitleTaskAC, deleteToDoListAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/taskReducer";
import {
    changeToDoListTitleAC,
    filterToDOListAC,
    toDoListReducer
} from "./reducers/toDoListReducer";

export type IFilter = 'all' | 'active' | 'completed'

export interface IToDoLists {
    id: string
    title: string
    filter: IFilter
}

export interface ITasksState {
    [key: string]: Array<ITasks>
}

export const App = React.memo(() => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todoLists, todoListsDispatch] = useReducer(toDoListReducer,
        [
            {
                id: todolistID1,
                title: 'What to Learn',
                filter: 'all'
            },
            {
                id: todolistID2,
                title: 'What to Buy',
                filter: 'all'
            }
        ]
    )

    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const changeFilter = (value: IFilter, todoListId: string) => {
        todoListsDispatch(filterToDOListAC(value, todoListId))
    }

    const removeTask = (id: string, todoListId: string) => {
        tasksDispatch(removeTaskAC(id, todoListId))
    } // функция удаления таски, благодаря useState компонента перерисовывается

    const addTask = (title: string, todoListId: string) => {
        tasksDispatch(addTaskAC(title, todoListId))
    } // делаем наш стейт иммутабельным для изменения

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        tasksDispatch(changeStatusTaskAC(taskId, isDone, todoListId))
    }

    const addToDoList = (title: string) => {
        const id = v1()
        todoListsDispatch(addToDoListAC(title, id))
        tasksDispatch(addToDoListAC(title, id))
    }

    const removeTodoList = (todoListId: string) => {
        todoListsDispatch(deleteToDoListAC(todoListId))
        tasksDispatch(deleteToDoListAC(todoListId))
    }

    const changeTitle = (taskId: string, newTitle: string, todoListId: string) => {
        tasksDispatch(changeTitleTaskAC(taskId, newTitle, todoListId))
    }

    const changeToDoListTitle = (newTitle: string, todoListId: string) => {
        todoListsDispatch(changeToDoListTitleAC(newTitle, todoListId))
    }

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Logic</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <InputText type={'text'} onAdd={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(todoList => {
                            return <Grid item>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                <Todo
                                    key={todoList.id}
                                    id={todoList.id}
                                    title={todoList.title}
                                    tasks={tasks}
                                    removeTask={removeTask}
                                    removeTodoList={removeTodoList}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    changeTitle={changeTitle}
                                    filter={todoList.filter}
                                    changeToDoListTitle={changeToDoListTitle}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
})

