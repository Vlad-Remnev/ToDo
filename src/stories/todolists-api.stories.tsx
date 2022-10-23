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
    useEffect(() => {
        toDoListsAPI.createToDoLists()
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const toDoListId = "690f1e5f-7378-4da3-b72e-46375d95aa67"
        toDoListsAPI.deleteToDoLists(toDoListId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const toDoListId = "690f1e5f-7378-4da3-b72e-46375d95aa67"
        const title = 'YYYYYYYYYYYY'
        toDoListsAPI.updateToDoLists(toDoListId, title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
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
    useEffect(() => {
        const toDoListId = "65ca6fdb-7bf5-4b7a-a279-ae0df9da4a9d"
        const title = 'JSJSJSJSJSJSJS'
        toDoListsAPI.createTask(toDoListId, title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const toDoListId = "65ca6fdb-7bf5-4b7a-a279-ae0df9da4a9d"
    const taskId = "70c4033d-c299-44b3-96bf-f6d569e47e47"
    useEffect(() => {
        toDoListsAPI.deleteTask(toDoListId, taskId)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const toDoListId = "65ca6fdb-7bf5-4b7a-a279-ae0df9da4a9d"
    const taskId = "2d158464-5c57-4fca-b96f-a4798df812bd"
    const title = 'ННННННЕЕЕЕЕЕТТТТТТ'
    useEffect(() => {
        toDoListsAPI.updateTask(toDoListId, taskId, title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}