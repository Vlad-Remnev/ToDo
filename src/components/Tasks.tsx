import React, {FC} from 'react';
import {ITasks} from "./Todo";
import {InputCheckBox} from "./InputCheckBox/InputCheckBox";

interface ITasksProps {
    tasks: ITasks[]
    removeTask: (taskId: string, taskTodoId: string) => void
    toDoListId: string
    changeTaskStatus: (taskId: string, isDone: boolean, taskTodoId: string) => void
}

export const Tasks: FC<ITasksProps> = ({tasks, removeTask, changeTaskStatus, toDoListId}) => {
    return (
        <>
            {
                tasks.length
                    ? tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <InputCheckBox title={task.title}
                                               id={toDoListId}
                                               type={'checkbox'}
                                               taskId={task.id}
                                               checked={task.isDone}
                                               removeTaskTitle={removeTask}
                                               onChecked={changeTaskStatus}/>
                            </li>
                        )
                    })
                    : <span>No tasks</span>
            }
        </>
    );
};
