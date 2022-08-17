import React, {ChangeEvent, FC} from 'react';
import s from './InputCheckBox.module.css'
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

export const InputCheckBox: FC<IInputCheckBox> = ({
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
    const onChangeTitleHandler = (newValue: string) => {
        onChangeTaskTitle(taskId, newValue, id)
    }
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
};