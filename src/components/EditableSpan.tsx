import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from "./InputCheckBox/InputCheckBox.module.css";
import {TextField} from "@mui/material";

interface IEditableSpan {
    title: string
    checked?: boolean
    onChange: (newValue: string) => void
}

export const EditableSpan: FC<IEditableSpan> = ({title, checked, onChange}) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(!editMode)
        setNewTitle(title)
        onChange(newTitle)
    }

    const changeKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.ctrlKey) {
            setEditMode(!editMode)
            setNewTitle(title)
            onChange(newTitle)
        }
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return editMode
        ? <TextField
            onKeyDown={changeKeyPress}
            onBlur={activateEditMode}
            onChange={onChangeTitleHandler}
            value={newTitle}
            autoFocus
            variant="standard"/>
        : <span onDoubleClick={activateEditMode} className={checked ? s.isDone : s.activeDone}>{title}</span>
}