import React, { FC } from "react";
import DatePicker from "react-datepicker";
import Input from "../../primitives/components/Input";
import List from "./List";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Box from "../../primitives/components/Box";
import Overview from "../../core/components/Overview/Overview";
import { useForm } from "./useForm";
import Button from "../../primitives/components/Button";

const Picker = styled.div`
  cursor: pointer;
  padding: 5px 15px;
  border: 0;
  border-radius: 4px;
  background-color: #216ba5;
  font: inherit;
  color: #fff;
`;

const ErrorMessage = styled.p`
  font-size: 0.85rem;
  line-height: 1;
  color: #ca2525;
`;

const Dashboard: FC = () => {
  const {
    date,
    errorMessage,
    handleDate,
    handleOnChange,
    handleSubmit,
    input,
    validate,
    tasks,
  } = useForm();
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
            minDate={new Date()}
            customInput={
              <Picker>
                {date ? date.toLocaleDateString() : "pick deadline"}
              </Picker>
            }
          />
          <Button type="submit">Add Task!</Button>
        </Box>
      </form>
      <List tasks={tasks} />
    </>
  );
};

export default Dashboard;
