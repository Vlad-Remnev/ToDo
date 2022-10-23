import React, {ChangeEvent, FC, useCallback} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {ITask, TaskStatuses} from "../../api/todolists-api";

interface IInputCheckBox {
    task: ITask
    removeTaskTitle: (id: string, todoListId: string) => void
    onChecked: (taskId: string, status: TaskStatuses, todoListId: string) => void
    onChangeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
}

export const Task: FC<IInputCheckBox> = React.memo(({
                                                      task,
                                                      removeTaskTitle,
                                                      onChecked,
                                                      onChangeTaskTitle
                                                  }) => {
    //функция удаления по кнопке Х
    const onRemoveHandler = () => removeTaskTitle(task.id, task.todoListId)
    //функция смены checked
    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChecked(task.id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, task.todoListId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        console.log('newTitle', newValue)
        onChangeTaskTitle(task.id, newValue, task.todoListId)
    }, [onChangeTaskTitle, task.id, task.todoListId])
    return (
        <>
            <div>
                <Checkbox onChange={onChangeCheckboxHandler}
                          checked={task.status === TaskStatuses.Completed}
                          color='primary'/>
                <EditableSpan title={task.title} checked={task.status} onChange={onChangeTitleHandler}/>
            </div>
            <IconButton onClick={onRemoveHandler} color="primary">
                <Delete/>
            </IconButton>
        </>
    );
});