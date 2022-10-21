import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'Task Component',
    component: Task
}

const removeTaskTitleCallback = action('Task removed')
const onCheckedCallback = action('Checkbox changed')
const onChangeTaskTitleCallback = action('Title changed')

export const TaskBasicExample = () => {
    return <>
        <Task title={'CSS'}
            id={'toDoListId1'}
            taskId={'1'}
            checked={true}
            removeTaskTitle={removeTaskTitleCallback}
            onChecked={onCheckedCallback}
            onChangeTaskTitle={onChangeTaskTitleCallback}
        />
        <Task title={'JS'}
              id={'toDoListId2'}
              taskId={'2'}
              checked={false}
              removeTaskTitle={removeTaskTitleCallback}
              onChecked={onCheckedCallback}
              onChangeTaskTitle={onChangeTaskTitleCallback}
        />
    </>
}