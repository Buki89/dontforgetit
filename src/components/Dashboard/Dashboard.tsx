import React, { FC, useContext, useEffect, useState } from "react";
import List from "../../pages/dashboard/List";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Box from "../../primitives/components/Box";
import { useForm } from "../../hooks/useForm";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import { AppStore } from "../../store/store";
import { Task, Type } from "../../store/Reducer";
import Header from "../../layout/components/Header/Header";
import Modal from "../../pages/dashboard/Modal";
import { Pagination } from "../Pagination";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SortButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 6rem;
  color: ${({ theme }) => theme.colors.black};
  border: 0;
  font-size: 1rem;
  font-weight: bold;
  margin-right: 0.25rem;
  margin-top: 1rem;
  outline: none;
  user-select: none;
`;

const Dashboard: FC = () => {
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(AppStore);

  const {
    date,
    errorMessage,
    input,
    validate,
    open,
    page,
    sortBy,
    handleOnChange,
    handleChangePage,
    handleDate,
    handleSubmit,
    handleSortBy,
    openModal,
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

  const pages = (): number => {
    if (sortBy === "all") {
      return Math.round(state.tasks.length / 8);
    } else if (sortBy === "completed") {
      return Math.round(
        state.tasks.filter((task) => task.completed === true).length / 8
      );
    } else {
      return Math.round(
        state.tasks.filter((task) => task.completed === false).length / 8
      );
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ReactLoading type="spin" color="#000" />
      </LoadingContainer>
    );
  }

  console.log(sortBy, pages());

  return (
    <>
      <Content>
        <Box direction="column" margin="2rem 0 0">
          <Header />
          <Box justifyContent="center">
            <SortButton value={"all"} onClick={handleSortBy}>
              {`All - (${state.tasks.length})`}
            </SortButton>
            <SortButton value={"completed"} onClick={handleSortBy}>
              {`Done - (${
                state.tasks.filter((task) => task.completed === true).length
              })`}
            </SortButton>
            <SortButton value={"incompleted"} onClick={handleSortBy}>
              {`In progress - (${
                state.tasks.filter((task) => task.completed === false).length
              })`}
            </SortButton>
          </Box>
          <List tasks={state.tasks} sort={sortBy} page={page} />
          {open && (
            <Modal
              date={date}
              errorMessage={errorMessage}
              handleDate={handleDate}
              handleOnChange={handleOnChange}
              input={input}
              handleSubmit={handleSubmit}
              validate={validate}
            />
          )}
        </Box>

        <Pagination handleChangePage={handleChangePage} page={pages()} />
      </Content>
      <AddButton onClick={openModal}>+</AddButton>
    </>
  );
};

export default Dashboard;
