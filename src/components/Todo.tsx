import React, {FC, useCallback} from 'react';
import {IFilter} from "../App";
import {InputText} from "./InputText/InputText";
import {Tasks} from "./Tasks";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export interface ITasks {
    id: string
    title: string
    isDone: boolean
}

interface ITodo {
    title: string
    id: string
    tasks: { [key: string]: ITasks[] }
    removeTask: (id: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (value: IFilter, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTitle: (id: string, newValue: string, todoListId: string) => void
    changeToDoListTitle: (newValue: string, todoListId: string) => void
    filter: IFilter
}

export const Todo: FC<ITodo> = React.memo(({
                                    title,
                                    id,
                                    tasks,
                                    removeTask,
                                    changeFilter,
                                    addTask,
                                    changeStatus,
                                    filter,
                                    removeTodoList,
                                    changeTitle,
                                    changeToDoListTitle
                                }) => {

    //функции фильтра по кнопкам
    const onAllClickHandler = useCallback(() => changeFilter('all', id), [])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [])
    //условия для работы фильтрации
    let allToDoListTasks = tasks[id]
    if (filter === 'completed') {
        allToDoListTasks = allToDoListTasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        allToDoListTasks = allToDoListTasks.filter(task => !task.isDone)
    }
    //функция удаления ToDoList с тасками
    const onRemoveTodoList = useCallback(() => removeTodoList(id), [])
    const changeToDoListTitleHandler = useCallback((title: string) => {
        changeToDoListTitle(title, id)
    }, [])
    const addNewTask = useCallback((title: string) => {
        addTask(title, id)
    }, [])
    return (
        <div className='toDo'>
            <h3>
                <EditableSpan title={title} onChange={changeToDoListTitleHandler}/>
                <IconButton onClick={onRemoveTodoList} color="secondary">
                    <Delete/>
                </IconButton>
            </h3>
            <div className='mrg'>
                <InputText type={'text'}
                           onAdd={addNewTask}/>
            </div>
            <div className='btn-filters'>
                <Button onClick={onAllClickHandler}
                        variant={filter === 'all' ? 'contained' : 'text'}>All</Button>
                <Button onClick={onActiveClickHandler}
                        color='primary'
                        variant={filter === 'active' ? 'contained' : 'text'}>Active</Button>
                <Button onClick={onCompletedClickHandler}
                        color='secondary'
                        variant={filter === 'completed' ? 'contained' : 'text'}>Completed</Button>
            </div>
            <ul>
                <Tasks tasks={allToDoListTasks}
                       removeTask={removeTask}
                       toDoListId={id}
                       changeTaskStatus={changeStatus}
                       changeTaskTitle={changeTitle}/>
            </ul>
        </div>
    );
});