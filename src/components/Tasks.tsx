import React, {FC} from 'react';
import {ITasks} from "./Todo";
import {InputCheckBox} from "./InputCheckBox/InputCheckBox";

interface ITasksProps {
    tasks: ITasks[]
    removeTask: (taskId: string, taskTodoId: string) => void
    toDoListId: string
    changeTaskStatus: (taskId: string, isDone: boolean, taskTodoId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, taskTodoId: string) => void
}

export const Tasks: FC<ITasksProps> = ({tasks, removeTask, changeTaskStatus, toDoListId, changeTaskTitle}) => {
    return (
        <>
            {
                tasks.length
                    ? tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <InputCheckBox title={task.title}
                                               id={toDoListId}
                                               taskId={task.id}
                                               checked={task.isDone}
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
};
