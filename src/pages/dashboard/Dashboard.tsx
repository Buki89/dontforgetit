import React, { FC, useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Input from "../../primitives/components/Input";
import List from "./List";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Box from "../../primitives/components/Box";
import { useForm } from "../../hooks/useForm";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import { AppStore } from "../../store/store";
import { Task, Type } from "../../store/Reducer";
import { BsCalendar } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";

const ErrorMessage = styled.p`
  font-size: 0.85rem;
  line-height: 1;
  color: #ca2525;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dashboard: FC = () => {
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(AppStore);

  const {
    date,
    errorMessage,
    handleDate,
    handleOnChange,
    handleSubmit,
    input,
    validate,
  } = useForm();

  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    const newState = [] as Task[];
    const uid = firebase.auth().currentUser?.uid;
    firebase
      .database()
      .ref(`${uid}/tasks`)
      .once("value")
      .then((snapshop) => {
        const data = snapshop.val();
        Object.keys(data).map((item) => {
          return newState.push(data[item]);
        });
        dispatch({ type: Type.setTasks, payload: newState });
        setLoading(false);
      })
      .catch((e) => {
        console.log("catch error message" + e);
        setLoading(false);
      });
  }, [dispatch, history]);

  if (loading) {
    return (
      <LoadingContainer>
        <ReactLoading type="spin" color="#000" />
      </LoadingContainer>
    );
  }

  console.log(state);

  return (
    <>
      <Content>
        <form onSubmit={handleSubmit}>
          <Box>
            <Box direction="column">
              <Input onChange={handleOnChange} value={input}></Input>

              {validate && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </Box>

            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={date}
              onChange={handleDate}
              minDate={new Date()}
              customInput={
                <BsCalendar size="40px">
                  {date ? date.toLocaleDateString() : "pick deadline"}
                </BsCalendar>
              }
            />
            {/* <Button color="blue" type="submit">
              Add Task!
            </Button> */}
            <button type="submit">
              <IoAddCircle size="40px" color="#00F" type="submit" />
            </button>
          </Box>
        </form>

        <List tasks={state.tasks} />
      </Content>
    </>
  );
};

export default Dashboard;
