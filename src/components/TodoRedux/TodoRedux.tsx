import React, {FC, useCallback} from 'react';
import {IFilter} from "../../App";
import {InputText} from "../InputText/InputText";
import {Tasks} from "../Tasks/Tasks";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "../../reducers/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";

export interface ITasks {
    id: string
    title: string
    isDone: boolean
}

interface ITodo {
    title: string
    id: string
    removeTodoList: (todoListId: string) => void
    changeFilter: (value: IFilter, todoListId: string) => void
    changeToDoListTitle: (newValue: string, todoListId: string) => void
    filter: IFilter
}

export const TodoRedux: FC<ITodo> = React.memo(({
                                    title,
                                    id,
                                    changeFilter,
                                    filter,
                                    removeTodoList,
                                    changeToDoListTitle
                                }) => {

    const dispatch = useDispatch()

    const tasks = useSelector<AppRootState, ITasks[]>(state => state.tasks[id] )

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }, [dispatch]) // функция удаления таски, благодаря useState компонента перерисовывается

    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeStatusTaskAC(taskId, isDone, todoListId))
    }, [dispatch])

    const changeTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {

        dispatch(changeTitleTaskAC(taskId, newTitle, todoListId))
    }, [dispatch])

    //функции фильтра по кнопкам
    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id])
    //условия для работы фильтрации
    let allToDoListTasks = tasks
    if (filter === 'completed') {
        allToDoListTasks = allToDoListTasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        allToDoListTasks = allToDoListTasks.filter(task => !task.isDone)
    }
    //функция удаления ToDoList с тасками
    const onRemoveTodoList = useCallback(() => removeTodoList(id), [removeTodoList, id])

    const changeToDoListTitleHandler = useCallback((newTitle: string) => {
        changeToDoListTitle(newTitle, id)
    }, [changeToDoListTitle, id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch, id])
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
                           onAdd={addTask}/>
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