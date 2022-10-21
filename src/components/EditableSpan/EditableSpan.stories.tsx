import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const changeTitleCallback = action('Title changed')

export const EditableSpanBasicExample = () => {
    return <>
        <EditableSpan title={'HTML'} onChange={changeTitleCallback} />
    </>
}