import React, {FC, useCallback, useEffect} from 'react';
import {IFilter} from "../../App";
import {InputText} from "../InputText/InputText";
import {Tasks} from "../Tasks/Tasks";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {
    addTaskTC,
    fetchTasks,
    removeTaskTC, updateTaskTC
} from "../../reducers/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";
import {ITask, TaskStatuses} from "../../api/todolists-api";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

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

    const dispatch = useDispatch<ThunkDispatch<AppRootState, unknown, AnyAction>>()

    const tasks = useSelector<AppRootState, ITask[]>(state => state.tasks[id] )

    useEffect(() => {
        dispatch(fetchTasks(id))
    }, [dispatch, id])

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskTC(id, todoListId))
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
        dispatch(updateTaskTC(todoListId, taskId, {status}))
    }, [dispatch])

    const changeTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(updateTaskTC(todoListId, taskId, {title: newTitle}))
    }, [dispatch])

    //функции фильтра по кнопкам
    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id])
    //условия для работы фильтрации
    let allToDoListTasks = tasks
    if (filter === 'completed') {
        allToDoListTasks = allToDoListTasks.filter(task => task.status === TaskStatuses.Completed)
    }
    if (filter === 'active') {
        allToDoListTasks = allToDoListTasks.filter(task => task.status === TaskStatuses.New)
    }
    //функция удаления ToDoList с тасками
    const onRemoveTodoList = useCallback(() => removeTodoList(id), [removeTodoList, id])

    const changeToDoListTitleHandler = useCallback((newTitle: string) => {
        changeToDoListTitle(newTitle, id)
    }, [changeToDoListTitle, id])

    const addTask = useCallback((title: string) => {
        // dispatch(addTaskAC(title, id))
        dispatch(addTaskTC(title, id))
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