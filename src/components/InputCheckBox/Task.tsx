import React, {ChangeEvent, FC, useCallback} from 'react';
import {EditableSpan} from "../EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

interface IInputCheckBox {
    title: string
    id: string
    taskId: string
    checked: boolean
    removeTaskTitle: (id: string, todoListId: string) => void
    onChecked: (taskId: string, isDone: boolean, todoListId: string) => void
    onChangeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
}

export const Task: FC<IInputCheckBox> = React.memo(({
                                                      title,
                                                      taskId,
                                                      checked,
                                                      removeTaskTitle,
                                                      onChecked,
                                                      id,
                                                      onChangeTaskTitle
                                                  }) => {
    //функция удаления по кнопке Х
    const onRemoveHandler = () => removeTaskTitle(taskId, id)
    //функция смены checked
    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChecked(taskId, event.currentTarget.checked, id)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        console.log('newTitle', newValue)
        onChangeTaskTitle(taskId, newValue, id)
    }, [onChangeTaskTitle, taskId, id])
    return (
        <>
            <div>
                <Checkbox onChange={onChangeCheckboxHandler}
                          checked={checked}
                          color='primary'/>
                <EditableSpan title={title} checked={checked} onChange={onChangeTitleHandler}/>
            </div>
            <IconButton onClick={onRemoveHandler} color="primary">
                <Delete/>
            </IconButton>
        </>
    );
});