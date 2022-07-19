import React, {ChangeEvent, FC} from 'react';
import s from './InputCheckBox.module.css'
import {Button} from "../Button";

interface IInputCheckBox {
    title: string
    id: string
    type: string
    taskId: string
    checked: boolean
    removeTaskTitle: (id: string, todoListId: string) => void
    onChecked: (taskId: string, isDone: boolean, todoListId: string) => void
}

export const InputCheckBox: FC<IInputCheckBox> = ({title, type, taskId, checked, removeTaskTitle, onChecked, id}) => {
    //функция удаления по кнопке Х
    const onRemoveHandler = () => removeTaskTitle(taskId, id)
    //функция смены checked
    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChecked(taskId, event.currentTarget.checked, id)
    }
    return (
        <>
            <div>
                <label className={checked ? s.isDone : s.activeDone}>
                <input type={type}
                       onChange={onChangeCheckboxHandler}
                       checked={checked}/>
                {title}</label>
            </div>
            <Button title={'X'} onClick={onRemoveHandler}/>
        </>
    );
};