import React, {useState} from 'react';
import './App.css';
import {ITasks, Todo} from "./components/Todo";
import {v1} from "uuid";

export type IFilter = 'all' | 'active' | 'completed'

interface IToDoLists {
    id: string
    title: string
    filter: IFilter
    tasks: Array<ITasks>
}

interface ITasksState {
    [key: string]: Array<ITasks>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<IToDoLists>>(
        [
            {
                id: todolistID1,
                title: 'What to Learn',
                filter: 'all',
                tasks: [
                    {id: v1(), title: 'CSS', isDone: true},
                    {id: v1(), title: 'HTML', isDone: true}
                ]
            },
            {
                id: todolistID2,
                title: 'What to Buy',
                filter: 'all',
                tasks: [
                    {id: v1(), title: 'JS', isDone: false},
                    {id: v1(), title: 'React', isDone: false}
                ]
            }
        ]
    )

    const [tasks, setTasks] = useState<ITasksState>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    // const [tasks, setTasks] = useState<Array<ITasks>>([
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'HTML', isDone: true},
    //     {id: v1(), title: 'JS', isDone: false},
    //     {id: v1(), title: 'React', isDone: false},
    // ])
    // const [filter, setFilter] = useState<IFilter>('all')

    const changeFilter = (value: IFilter, todoListId: string) => {
        let todolist = todoLists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    const removeTask = (id: string, todoListId: string) => {
        let resultTasks = tasks[todoListId]
        tasks[todoListId] = resultTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    } // функция удаления таски, благодаря useState компонента перерисовывается

    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let toDoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...toDoListTasks]
        setTasks({...tasks})

    } // делаем наш стейт иммутабельным для изменения

    const changeStatus = (taskId: string, isDone: boolean , todoListId: string) => {
        let toDoListTask = tasks[todoListId]
        let task = toDoListTask.find(task => task.id === taskId)
        if(task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(todolist => todolist.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todoLists.map(todoList => {
                    let allToDoListTasks = tasks[todoList.id]
                    let tasksForTodoList = allToDoListTasks
                    if (todoList.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(task => task.isDone)
                    }

                    if (todoList.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(task => !task.isDone)
                    }
                    return <Todo
                        key={todoList.id}
                        id={todoList.id}
                        title={todoList.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={todoList.filter}/>
                })
            }
        </div>
    );
}

export default App;
