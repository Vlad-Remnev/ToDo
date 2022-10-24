import React, {useEffect, useState} from 'react'
import axios from "axios";
import {toDoListsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetToDoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        toDoListsAPI.getToDoLists()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')

    const createToDoList = () => {
        toDoListsAPI.createToDoLists(title)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" onChange={(e) => setTitle(e.currentTarget.value)} placeholder='title'/>
            <button onClick={createToDoList}>Create ToDoList</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [toDoListId, setToDoListId] = useState<any>('')

    const deleteToDoList = () => {
        toDoListsAPI.deleteToDoLists(toDoListId)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" onChange={(e) => setToDoListId(e.currentTarget.value)} placeholder='toDoListId'/>
            <button onClick={deleteToDoList}>Delete ToDoList</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [toDoListId, setToDoListId] = useState<any>('')
    const [title, setTitle] = useState<any>('')

    const updateTodoList = () => {
        toDoListsAPI.updateToDoLists(toDoListId, title)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" onChange={(e) => setToDoListId(e.currentTarget.value)} placeholder='toDoListId'/>
            <input type="text" onChange={(e) => setTitle(e.currentTarget.value)} placeholder='title'/>
            <button onClick={updateTodoList}>Update ToDoList</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const toDoListId = "65ca6fdb-7bf5-4b7a-a279-ae0df9da4a9d"
        toDoListsAPI.getTasks(toDoListId)
            .then(res => setState(res.data.items))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [toDoListId, setToDoListId] = useState<any>('')
    const [title, setTitle] = useState<any>('')

    const createTask = () => {
        toDoListsAPI.createTask(toDoListId, title)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" onChange={(e) => setToDoListId(e.currentTarget.value)} placeholder='toDoListId'/>
            <input type="text" onChange={(e) => setTitle(e.currentTarget.value)} placeholder='title'/>
            <button onClick={createTask}>Update Task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>('')
    const [toDoListId, setToDoListId] = useState<any>('')

    const deleteTask = () => {
        toDoListsAPI.deleteTask(toDoListId, taskId)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" onChange={(e) => setTaskId(e.currentTarget.value)} placeholder='taskId'/>
            <input type="text" onChange={(e) => setToDoListId(e.currentTarget.value)} placeholder='toDoListId'/>
            <button onClick={deleteTask}>Delete Task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>('')
    const [toDoListId, setToDoListId] = useState<any>('')
    const [title, setTitle] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [status, setStatus] = useState<any>(0)
    const [priority, setPriority] = useState<any>(0)
    const [startDate, setStartDate] = useState<any>('')
    const [deadline, setDeadline] = useState<any>('')

    const updateTask = () => {
        toDoListsAPI.updateTask(toDoListId, taskId, {
            deadline,
            description,
            priority,
            startDate,
            title,
            status,

        })
            .then(res => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
    <div>
        <input type="text" onChange={(e) => setTaskId(e.currentTarget.value)} placeholder='taskId'/>
        <input type="text" onChange={(e) => setToDoListId(e.currentTarget.value)} placeholder='toDoListId'/>
        <input type="text" onChange={(e) => setTitle(e.currentTarget.value)} placeholder='title'/>
        <input type="text" onChange={(e) => setDescription(e.currentTarget.value)} placeholder='description'/>
        <input type="number" onChange={(e) => setStatus(+e.currentTarget.value)} placeholder='status'/>
        <input type="number" onChange={(e) => setPriority(+e.currentTarget.value)} placeholder='priority'/>
        <button onClick={updateTask}>Update Task</button>
    </div>
    </div>
}