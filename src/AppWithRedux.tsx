import React, {useReducer, useState} from 'react';
import './App.css';
import {ITasks} from "./components/Todo";
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import {TodoRedux} from "./components/TodoRedux";

export type IFilter = 'all' | 'active' | 'completed'

export interface IToDoLists {
    id: string
    title: string
    filter: IFilter
}

export interface ITasksState {
    [key: string]: Array<ITasks>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, IToDoLists[]>(state => state.todolists )
    // const tasks = useSelector<AppRootState, ITasksState>(state => state.tasks )

    const changeFilter = (value: IFilter, todoListId: string) => {
        dispatch(filterToDOListAC(value, todoListId))
    }

    // const removeTask = (id: string, todoListId: string) => {
    //     dispatch(removeTaskAC(id, todoListId))
    // } // функция удаления таски, благодаря useState компонента перерисовывается
    //
    // const addTask = (title: string, todoListId: string) => {
    //     dispatch(addTaskAC(title, todoListId))
    // } // делаем наш стейт иммутабельным для изменения
    //
    // const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    //     dispatch(changeStatusTaskAC(taskId, isDone, todoListId))
    // }
    //
    // const changeTitle = (taskId: string, newTitle: string, todoListId: string) => {
    //     dispatch(changeTitleTaskAC(taskId, newTitle, todoListId))
    // }
    //Логика сидит внутри компоненты, так как в store есть доступ у всех детей

    const addToDoList = (title: string) => {
        const id = v1()
        dispatch(addToDoListAC(title, id))
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(deleteToDoListAC(todoListId))
    }

    const changeToDoListTitle = (newTitle: string, todoListId: string) => {
        dispatch(changeToDoListTitleAC(newTitle, todoListId))
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
                                <TodoRedux
                                    key={todoList.id}
                                    id={todoList.id}
                                    title={todoList.title}
                                    removeTodoList={removeTodoList}
                                    changeFilter={changeFilter}
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
}

export default AppWithRedux;
