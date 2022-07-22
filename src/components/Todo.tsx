import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {IFilter} from "../App";
import {Button} from "./Button";
import {InputText} from "./InputText/InputText";
import {InputCheckBox} from "./InputCheckBox/InputCheckBox";
import {Tasks} from "./Tasks";

export interface ITasks {
    id: string
    title: string
    isDone: boolean
}

interface ITodo {
    title: string
    id: string
    tasks: {[key:string]: ITasks[]}
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
    //условия для работы фильтрации
    let allToDoListTasks = tasks[id]
    if (filter === 'completed') {
        allToDoListTasks = allToDoListTasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        allToDoListTasks = allToDoListTasks.filter(task => !task.isDone)
    }
    //функция удаления ToDoList с тасками
    const onRemoveTodoList = () => removeTodoList(id)
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
                <Tasks tasks={allToDoListTasks}
                       removeTask={removeTask}
                       toDoListId={id}
                       changeTaskStatus={changeStatus}/>
            </ul>
        </div>
    );
};