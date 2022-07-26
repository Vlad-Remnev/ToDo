import React, {useReducer} from 'react';
import './App.css';
import {Todo} from "./components/Todo";
import {v1} from "uuid";
import {InputText} from "./components/InputText/InputText";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTaskTC,
    removeTaskAC,
    tasksReducer, updateTaskTC
} from "./reducers/taskReducer";
import {
    addToDoListTC,
    changeToDoListTitleAC,
    filterToDOListAC, removeToDoListTC, toDoListReducer
} from "./reducers/toDoListReducer";
import {ITask, TaskPriorities, TaskStatuses} from "./api/todolists-api";

export type IFilter = 'all' | 'active' | 'completed'

export interface ITasksState {
    [key: string]: ITask[]
}

export const App = React.memo(() => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todoLists, todoListsDispatch] = useReducer(toDoListReducer,
        [
            {
                id: todolistID1,
                title: 'What to Learn',
                filter: 'all',
                addedDate: '',
                order: 0
            },
            {
                id: todolistID2,
                title: 'What to Buy',
                filter: 'all',
                addedDate: '',
                order: 0
            }
        ]
    )

    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            {   id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                description: '',
                todoListId: todolistID1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        [todolistID2]: [
            {   id: v1(),
                title: 'React',
                status: TaskStatuses.New,
                description: '',
                todoListId: todolistID1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    })

    const changeFilter = (value: IFilter, todoListId: string) => {
        todoListsDispatch(filterToDOListAC(value, todoListId))
    }

    const removeTask = (id: string, todoListId: string) => {
        tasksDispatch(removeTaskAC(id, todoListId))
    } // функция удаления таски, благодаря useState компонента перерисовывается

    const addTask = (title: string, todoListId: string) => {
        const task = { id: v1(),
            title: 'React',
            status: TaskStatuses.New,
            description: '',
            todoListId: todolistID1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        }
        // @ts-ignore
        tasksDispatch(addTaskTC(task, todoListId))
    } // делаем наш стейт иммутабельным для изменения
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const changeStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
        // @ts-ignore
        tasksDispatch(updateTaskTC(todoListId, taskId, {status}))
    }

    const addToDoList = (title: string) => {
        // @ts-ignore
        tasksDispatch(addToDoListTC(title))
    }

    const removeTodoList = (todoListId: string) => {
        // @ts-ignore
        todoListsDispatch(removeToDoListTC(todoListId))
    }

    const changeTitle = (taskId: string, newTitle: string, todoListId: string) => {
        // @ts-ignore
        tasksDispatch(updateTaskTC(todoListId, taskId, {title: newTitle}))
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

