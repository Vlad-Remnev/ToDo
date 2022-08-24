import React, {ChangeEvent, FC, KeyboardEvent, useCallback, useState} from 'react';
import s from "./InputCheckBox/InputCheckBox.module.css";
import {TextField} from "@mui/material";

interface IEditableSpan {
    title: string
    checked?: boolean
    onChange: (newValue: string) => void
}

export const EditableSpan: FC<IEditableSpan> = React.memo(({title, checked, onChange}) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const activateEditMode = () => {
        setEditMode(true)
    }

    const onBlur = useCallback(() => {
        setEditMode(false)
        onChange(newTitle)
    }, [onChange, newTitle])

    const changeKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.ctrlKey) {
            onBlur()
        }
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return editMode
        ? <TextField
            onKeyDown={changeKeyPress}
            onBlur={onBlur}
            onChange={onChangeTitleHandler}
            value={newTitle}
            autoFocus
            variant="standard"/>
        : <span onDoubleClick={activateEditMode} className={checked ? s.isDone : s.activeDone}>{title}</span>
})