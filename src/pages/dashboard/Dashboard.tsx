import React,{FC,useCallback,useState} from 'react'
import Header from '../../layout/components/Header';
import { TaskMock } from '../../Mock/TaskMock';
import Task,{ TaskProps } from './Task';
import Input from '../../primitives/components/Input'


const Dashboard: FC = () => {
    const [value,setValue] = useState<TaskProps>();
    const [input,setInput] = useState('');

    const handleOnChange = useCallback((event)=> {
        const {value} = event.target;
        setInput(value);
    },[]);
    const handleSubmit = useCallback((e)=>{
        e.preventDefault(); 
        setValue({id:'as',taskName:input, completed:true, deadline:'20.12:2020'})
    }
        ,[input])

console.log(value)
console.log(input)

    return(
        <>
        <Header />
        <form onSubmit={handleSubmit}>
        <Input onChange={handleOnChange} value={input}/>
        <button type='submit'>Add</button>
        </form>
    
        </>
    )
}

export default Dashboard;