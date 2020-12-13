import React, { FC, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import Input from "../../primitives/components/Input";
import List from "./List";
import { TaskProps } from "./Item";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Box from "../../primitives/components/Box";
import Overview from "../../core/components/Overview/Overview";

const ErrorMessage = styled.p`
  font-size: 0.85rem;
  line-height: 1;
  color: #ca2525;
`;

const Dashboard: FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState<Date | null | undefined>(new Date());
  const [validate, setValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      setInput(input);
    },
    []
  );

  const handleDeleleTask = useCallback(
    (id: string) => {
      const newArr = tasks.filter((task: TaskProps) => {
        return task.id !== id;
      });
      setTasks(newArr);
    },
    [tasks]
  );

  const handleDate = useCallback((event) => setDate(event), []);

  const handleChangeCompleted = useCallback(
    (id: string) => {
      const newArr = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });

      setTasks(newArr);
    },
    [tasks]
  );
  const handleChangeTaskName = useCallback(
    (id: string, newValue: string) => {
      const newState = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            taskName: newValue,
          };
        }
        return task;
      });

      setTasks(newState);
    },
    [tasks]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const alreadyUsed = tasks.some((item) => item.taskName === input);
      const emptyInput = input.length === 0;

      e.preventDefault();

      if (alreadyUsed) {
        setValidate(true);
        setErrorMessage("There is already task with that name");
        return;
      }
      if (emptyInput) {
        setValidate(true);
        setErrorMessage("Empty field");
        return;
      }
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          taskName: input,
          completed: false,
          deadline: date?.toLocaleDateString(),
          createdAt: new Date().toLocaleDateString(),
        },
      ]);
      setValidate(false);
      setInput("");
    },
    [input, tasks, date]
  );

  const overall = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const incompleted = overall - completed;

  return (
    <>
      <Overview
        overall={overall}
        completed={completed}
        incompleted={incompleted}
      />

      <form onSubmit={handleSubmit}>
        <Box>
          <Box direction="column">
            <Input onChange={handleOnChange} value={input} />
            {validate && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Box>

          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={date}
            onChange={handleDate}
          />
          <button type="submit">Add Task!</button>
        </Box>
      </form>
      <List
        tasks={tasks}
        handleDeleleTask={handleDeleleTask}
        handleChangeCompleted={handleChangeCompleted}
        handleChangeTaskName={handleChangeTaskName}
      />
    </>
  );
};

export default Dashboard;
