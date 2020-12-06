import React,{FC} from 'react'
import Header from '../../layout/components/Header';
import { TaskMock } from '../../Mock/TaskMock';
import Task,{ TaskProps } from './Task';


const Dashboard: FC = () => {
    return(
        <>
        <Header />
    <div>{TaskMock.map((Item: TaskProps)=>(
        <>
        <Task {...Item}/>
        </>
    ))}</div>
        </>
    )
}

export default Dashboard;