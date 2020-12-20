import React, { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Input from "../../primitives/components/Input";
import List from "./List";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Box from "../../primitives/components/Box";
import Overview from "../../core/components/Overview/Overview";
import { useForm } from "./useForm";
import Button from "../../primitives/components/Button";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";

type data = {
  id: string;
  taskName: string;
  deadline: string;
  createdAt: string;
  completed: boolean;
};

const Picker = styled.div`
  cursor: pointer;
  padding: 5px 15px;
  border: 0;
  border-radius: 4px;
  background-color: #216ba5;
  color: #fff;
`;

const ErrorMessage = styled.p`
  font-size: 0.85rem;
  line-height: 1;
  color: #ca2525;
`;

const Dashboard: FC = () => {
  const [loading, setLoading] = useState(true);

  const {
    date,
    errorMessage,
    handleDate,
    handleOnChange,
    handleSubmit,
    handleChangeCompleted,
    handleChangeTaskName,
    handleDeleleTask,
    input,
    validate,
    tasks,
    setTasks,
  } = useForm();
  const overall = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const incompleted = overall - completed;

  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    const newState = [] as data[];
    const uid = firebase.auth().currentUser?.uid;
    firebase
      .database()
      .ref(`tasks/${uid}`)
      .once("value")
      .then((snapshop) => {
        const data = snapshop.val();
        Object.keys(data).map((item) => {
          return newState.push(data[item]);
        });
        setTasks(newState);
        setLoading(false);
      })
      .catch((e) => {
        console.log("catch error message" + e);
        setLoading(false);
      });
  }, [history, setTasks]);

  if (loading) {
    return <ReactLoading type="spin" color="#000" />;
  }

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

      <List
        tasks={tasks}
        handleChangeCompleted={handleChangeCompleted}
        handleChangeTaskName={handleChangeTaskName}
        handleDeleleTask={handleDeleleTask}
      />
    </>
  );
};

export default Dashboard;
