import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from './InputText.module.css'
import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

interface IInputText {
    type: string
    value?: string
    onAdd: (value: string) => void
    className?: string
}

export const InputText: FC<IInputText> = ({type, value, onAdd, className}) => {
    const [name, setName] = useState<string>(value || '')
    const [error, setError] = useState<string | null>(null)

    //функции добавления тасок и отслеживание value инпута
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
        setError(null)
    }

    const onAddHandler = () => {
        if (name.trim() !== '') {
            onAdd(name)
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
        <div className={s.main}>
            <TextField type={type}
                       value={name}
                       label='Type any text...'
                       variant="outlined"
                       onChange={onChangeHandler}
                       onKeyDown={changeKeyPress}
                       color='primary'
                       error={!!error}
                       helperText={error}/>
            <IconButton onClick={onAddHandler} color="primary">
                <AddCircle/>
            </IconButton>
        </div>
    );
};