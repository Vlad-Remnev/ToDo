import {InputText} from "./InputText";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'InputText Component',
    component: InputText
}

const callback = action('Button "plus" was pressed inside the form')

export const InputTextBasicExample = () => {
    return <InputText type={'text'} onAdd={callback}/>
}