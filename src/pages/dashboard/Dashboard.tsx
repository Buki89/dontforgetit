import React, { FC, useCallback, useContext, useEffect, useState } from "react";
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
import { Button } from "../../primitives";
import Header from "../../layout/components/Header/Header";

const ErrorMessage = styled.p`
  font-size: 0.85rem;
  line-height: 1;
  color: #ca2525;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const AddButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 0;
  position: absolute;
  bottom: -1.5rem;
  left: calc(50% - 1.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  color: ${({ theme }) => theme.colors.white};
  font-size: 2rem;
  outline: none;
`;

const Modal = styled.div`
  @keyframes example {
    from {
      background-color: transparent;
    }
    to {
      background-color: #fff;
    }
  }

  width: 100%;
  z-index: 100;
  height: 30%;
  position: absolute;
  bottom: 0;
  left: -2rem;
  background-color: #fff;
  animation-name: example;
  animation-duration: 0.5s;
  padding: 2rem;
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
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(!open), [open]);

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
        <Box direction="column" margin="2rem 0">
          <Header />

          <List tasks={state.tasks} />
          <AddButton onClick={openModal}>+</AddButton>
          {open && (
            <Modal>
              <form onSubmit={handleSubmit}>
                <Box direction="column">
                  <Input onChange={handleOnChange} value={input}></Input>

                  {validate && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
                  <Button color="blue" type="submit">
                    Add Task!
                  </Button>
                </Box>
              </form>
            </Modal>
          )}
        </Box>
      </Content>
    </>
  );
};

export default Dashboard;
