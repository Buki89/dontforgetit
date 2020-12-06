import React,{FC} from 'react'
import styled from 'styled-components'


export type TaskProps = {
    id:string;
    taskName: string;
    completed: boolean;
    deadline?: string;



}

const Task: FC<TaskProps> = ({taskName, completed, id, deadline}) => {
    return(
        <>
    <div>{taskName}</div>
    <button>delete</button>
    <button>edit</button>
    <div>{deadline}</div>
    <input checked={completed} type='checkbox'></input>

    </>
    )
}

export default Task;