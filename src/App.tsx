import React, {useState} from 'react';
import './App.css';
import {ITasks, Todo} from "./components/Todo";
import {v1} from "uuid";

export type IFilter = 'all' | 'active' | 'completed'

interface IToDoLists {
    id: string
    title: string
    filter: IFilter
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
                filter: 'all'
            },
            {
                id: todolistID2,
                title: 'What to Buy',
                filter: 'all'
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

    const changeFilter = (value: IFilter, todoListId: string) => {
        setTodoLists(todoLists.map(todoList => todoList.id === todoListId ? {...todoList, filter: value} : todoList))
    }

    const removeTask = (id: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== id)})
    } // функция удаления таски, благодаря useState компонента перерисовывается

    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    } // делаем наш стейт иммутабельным для изменения

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(todoList => todoList.id !== todoListId))
        delete tasks[todoListId]
    }

    return (
        <div className="App">
            {
                todoLists.map(todoList => {
                    return <Todo
                        key={todoList.id}
                        id={todoList.id}
                        title={todoList.title}
                        tasks={tasks}
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
