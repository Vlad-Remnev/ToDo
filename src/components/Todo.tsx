import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {IFilter} from "../App";
import {Button} from "./Button";
import {InputText} from "./InputText/InputText";
import {InputCheckBox} from "./InputCheckBox/InputCheckBox";

export interface ITasks {
    id: string
    title: string
    isDone: boolean
}

interface ITodo {
    title: string
    id: string
    tasks: ITasks[]
    removeTask: (id: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (value: IFilter, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: IFilter
}

export const Todo: FC<ITodo> = ({title, id, tasks, removeTask, changeFilter, addTask, changeStatus, filter, removeTodoList}) => {

    //функции фильтра по кнопкам
    const onAllClickHandler = () => changeFilter('all', id)
    const onActiveClickHandler = () => changeFilter('active', id)
    const onCompletedClickHandler = () => changeFilter('completed', id)
    const onRemoveTodoList = () => removeTodoList(id)

    const tasksList = tasks.length
        ? tasks.map(task => {
            return (
                <li key={task.id}>
                    <InputCheckBox title={task.title}
                                   id={id}
                                   type={'checkbox'}
                                   taskId={task.id}
                                   checked={task.isDone}
                                   removeTaskTitle={removeTask}
                                   onChecked={changeStatus}/>
                </li>
            )
        })
        : <span>No tasks</span>
    return (
        <div className='toDo'>
            <h3>{title} <Button title={'x'} onClick={onRemoveTodoList}/></h3>
            <InputText type={'text'}
                       id={id}
                       onAdd={addTask}/>
            <div className='btn-filters'>
                <Button title={'All'} onClick={onAllClickHandler}
                        className={filter === 'all' ? 'filter-btn' + ' active-filter' : 'filter-btn'}/>
                <Button title={'Active'} onClick={onActiveClickHandler}
                        className={filter === 'active' ? 'filter-btn' + ' active-filter' : 'filter-btn'}/>
                <Button title={'Completed'} onClick={onCompletedClickHandler}
                        className={filter === 'completed' ? 'filter-btn' + ' active-filter' : 'filter-btn'}/>
            </div>
            <ul>
                {tasksList}
            </ul>
        </div>
    );
};