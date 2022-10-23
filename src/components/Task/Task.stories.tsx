import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {v1} from "uuid";

export default {
    title: 'Task Component',
    component: Task
}

const removeTaskTitleCallback = action('Task removed')
const onCheckedCallback = action('Checkbox changed')
const onChangeTaskTitleCallback = action('Title changed')

export const TaskBasicExample = () => {
    const TaskOne = {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.New,
        description: '',
        todoListId: v1(),
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
    }
    const TaskTwo = {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        description: '',
        todoListId: v1(),
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
    }
    return <>
        <Task task={TaskOne}
            removeTaskTitle={removeTaskTitleCallback}
            onChecked={onCheckedCallback}
            onChangeTaskTitle={onChangeTaskTitleCallback}
        />
        <Task task={TaskTwo}
              removeTaskTitle={removeTaskTitleCallback}
              onChecked={onCheckedCallback}
              onChangeTaskTitle={onChangeTaskTitleCallback}
        />
    </>
}