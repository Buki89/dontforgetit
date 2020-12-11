import React,{FC,useCallback,useState} from 'react'


export type TaskProps = {
    id:string;
    taskName: string;
    completed: boolean;
    deadline?: Date | null | string;



}

const Task: FC<TaskProps> = ({taskName, completed, id, deadline}) => {
    const [checked, setChecked] = useState(false);

    const handleChange = useCallback(()=>setChecked(!checked) ,[checked])
    return(
        <>
    <div>{taskName}</div>
    <button>delete</button>
    <button>edit</button>
    <div>{deadline}</div>
    <input onChange={handleChange} checked={checked} type='checkbox'></input>

    </>
    )
}

export default Task;