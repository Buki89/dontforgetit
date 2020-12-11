import React, { FC, useCallback, useState } from "react";
import Header from "../../layout/components/Header";
import { TaskProps } from "./Task";
import Input from "../../primitives/components/Input";
import DatePicker from "react-datepicker";
import Task from './Task'
import { v4 as uuidv4 } from 'uuid';


 
import "react-datepicker/dist/react-datepicker.css";


const Dashboard: FC = () => {
  const [value, setValue] = useState<TaskProps[]>([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState<Date  | null | undefined>(new Date());

  const handleOnChange = useCallback((event) => {
    const { value } = event.target;
    setInput(value);
  }, []);



  const handleDate = useCallback((event)=> setDate(event),[])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setValue([...value,{
        id: uuidv4()	,
        taskName: input,
        completed: false,
        deadline: date?.toLocaleDateString(),
      }]);
    },
    [input, value, date], 
  );

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <Input onChange={handleOnChange} value={input} />
        <DatePicker dateFormat='dd/MM/yyyy'  selected={date} onChange={handleDate} /> 
        <button type="submit">Add</button>
      </form>
      {value.length !== 0 && value.map((item: TaskProps)=>(
      <Task key={item.id} id={item.id} taskName={item.taskName} completed={item.completed} deadline={item.deadline}  />
        
      ))}
    </>
  );
};

export default Dashboard;
