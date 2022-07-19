import React, {FC} from 'react';

interface IButton {
    title: string
    onClick: () => void
    className?: string
    disabled?: boolean
}

export const Button:FC<IButton> = ({title, disabled, onClick, className}) => {
    return (
        <button disabled={disabled} onClick={onClick} className={className}>{title}</button>
    );
};