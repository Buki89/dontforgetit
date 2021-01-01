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
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SortButton = styled.button<{ selected: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 6rem;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.black : theme.colors.ligthGrey};
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
    localState,
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
    if (localState.sortBy === "all") {
      return Math.floor(state.tasks.length / 9) + 1;
    } else if (localState.sortBy === "completed") {
      return (
        Math.floor(
          state.tasks.filter((task) => task.completed === true).length / 9
        ) + 1
      );
    } else {
      return (
        Math.floor(
          state.tasks.filter((task) => task.completed === false).length / 9
        ) + 1
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

  return (
    <>
      <Content>
        <Box direction="column" justifyContent="space-between" height="79vh">
          <Box direction="column" margin="2rem 0 0">
            <Header />
            <Box justifyContent="center">
              <input />
            </Box>

            <Box justifyContent="center">
              <SortButton
                selected={localState.sortBy === "all"}
                value={"all"}
                onClick={handleSortBy}
              >
                {`All - (${state.tasks.length})`}
              </SortButton>
              <SortButton
                selected={localState.sortBy === "completed"}
                value={"completed"}
                onClick={handleSortBy}
              >
                {`Done - (${
                  state.tasks.filter((task) => task.completed === true).length
                })`}
              </SortButton>
              <SortButton
                selected={localState.sortBy === "incompleted"}
                value={"incompleted"}
                onClick={handleSortBy}
              >
                {`In progress - (${
                  state.tasks.filter((task) => task.completed === false).length
                })`}
              </SortButton>
            </Box>
            <List
              tasks={state.tasks}
              sort={localState.sortBy}
              page={localState.activePage}
            />
            {localState.open && (
              <Modal
                date={localState.deadline}
                errorMessage={localState.errorMessage}
                handleDate={handleDate}
                handleOnChange={handleOnChange}
                input={localState.taskName}
                handleSubmit={handleSubmit}
                validate={localState.validate}
              />
            )}
          </Box>

          <Pagination handleChangePage={handleChangePage} page={pages()} />
        </Box>
      </Content>
      <AddButton onClick={openModal}>+</AddButton>
    </>
  );
};

export default Dashboard;
