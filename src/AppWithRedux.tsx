import React, {useCallback, useEffect} from 'react';
import './App.css';
import {InputText} from "./components/InputText/InputText";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addToDoListTC, fetchToDoLists,
    filterToDOListAC, IFilter, ITodoListDomain, removeToDoListTC, updateToDoListTC,
} from "./reducers/toDoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import {TodoRedux} from "./components/TodoRedux/TodoRedux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";



export const AppWithRedux = React.memo(() => {
    const dispatch = useDispatch<ThunkDispatch<AppRootState, unknown, AnyAction>>()
    const todoLists = useSelector<AppRootState, ITodoListDomain[]>(state => state.todolists)
    const changeFilter = useCallback((value: IFilter, todoListId: string) => {
        dispatch(filterToDOListAC(value, todoListId))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchToDoLists())
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        dispatch(addToDoListTC(title))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeToDoListTC(todoListId))
    }, [dispatch])

    const changeToDoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(updateToDoListTC(todoListId, newTitle))
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
                            return <Grid item key={todoList.id}>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <TodoRedux
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
