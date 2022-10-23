import React, {FC} from 'react';
import {Task} from "../Task/Task";
import {v1} from "uuid";
import {ITask, TaskStatuses} from "../../api/todolists-api";

interface ITasksProps {
    tasks: ITask[]
    removeTask: (taskId: string, taskTodoId: string) => void
    toDoListId: string
    changeTaskStatus: (taskId: string, status: TaskStatuses, taskTodoId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, taskTodoId: string) => void
}

export const Tasks: FC<ITasksProps> = React.memo(({tasks, removeTask, changeTaskStatus, toDoListId, changeTaskTitle}) => {
    return (
        <>
            {
                tasks.length
                    ? tasks.map(task => {
                        return (
                            <li key={v1()}>
                                <Task
                                    task={task}
                                    removeTaskTitle={removeTask}
                                    onChecked={changeTaskStatus}
                                    onChangeTaskTitle={changeTaskTitle}/>
                            </li>
                        )
                    })
                    : <span>No tasks</span>
            }
        </>
    );
});
