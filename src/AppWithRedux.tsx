import React, {useCallback} from 'react';
import './App.css';
import {v1} from "uuid";
import {InputText} from "./components/InputText/InputText";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addToDoListAC,
    deleteToDoListAC,
} from "./reducers/taskReducer";
import {
    changeToDoListTitleAC,
    filterToDOListAC, IFilter, ITodoListDomain,
} from "./reducers/toDoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import {TodoRedux} from "./components/TodoRedux/TodoRedux";



export const AppWithRedux = React.memo(() => {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, ITodoListDomain[]>(state => state.todolists)
    const changeFilter = useCallback((value: IFilter, todoListId: string) => {
        dispatch(filterToDOListAC(value, todoListId))
    }, [dispatch])

    // const removeTask = (id: string, todoListId: string) => {
    //     dispatch(removeTaskAC(id, todoListId))
    // } // функция удаления таски, благодаря useState компонента перерисовывается
    //
    // const addTask = (title: string, todoListId: string) => {
    //     dispatch(addTaskAC(title, todoListId))
    // } // делаем наш стейт иммутабельным для изменения
    //
    // const changeStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
    //     dispatch(changeStatusTaskAC(taskId, isDone, todoListId))
    // }
    //
    // const changeTitle = (taskId: string, newTitle: string, todoListId: string) => {
    //     dispatch(changeTitleTaskAC(taskId, newTitle, todoListId))
    // }
    //Логика сидит внутри компоненты, так как в store есть доступ у всех детей

    const addToDoList = useCallback((title: string) => {
        const id = v1()
        dispatch(addToDoListAC(title, id))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(deleteToDoListAC(todoListId))
    }, [dispatch])

    const changeToDoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(changeToDoListTitleAC(newTitle, todoListId))
    }, [dispatch])

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
})
