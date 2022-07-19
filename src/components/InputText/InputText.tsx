import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from './InputText.module.css'
import {Button} from "../Button";

interface IInputText {
    type: string
    id: string
    value?: string
    onAdd: (value: string, todoListId: string) => void
    className?: string
}

export const InputText: FC<IInputText> = ({type, value, onAdd, className, id}) => {
    const [name, setName] = useState<string>(value || '')
    const [error, setError] = useState<string | null>(null)

    //функции добавления тасок и отслеживание value инпута
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
        setError(null)
    }

    const onAddHandler = () => {
        if (name.trim() !== ''){
            onAdd(name, id)
            setName('')
        } else {
            setError('Filed is required')
        }
    }

    const changeKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.ctrlKey) {
            onAddHandler()
            setName('')
        }
    }

    return (
        <div>
            <input type={type}
                   value={name}
                   onChange={onChangeHandler}
                   onKeyDown={changeKeyPress}
                   className={error ? s.error : s.okBorder}/>
            <Button title={'+'} onClick={onAddHandler}/>
            {error ?
                <div className={s.errorMessage}>{error}</div>
                :
                <div className={s.sample}>{error}</div>}
        </div>
    );
};