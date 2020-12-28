import React, { FC, useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { Task, Type } from "../../store/Reducer";
import { AppStore } from "../../store/store";
import { firebase } from "../../firebase/config";
import Box from "../../primitives/components/Box";
import { formatDeadline } from "../../helper/formatDeadline";
import { Checkbox, Button } from "../../primitives";

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 4rem;
  border-radius: 6px;
  padding: 0.25rem 2rem;
  margin: 0.25rem 0;
  min-width: 60vw;
  justify-content: space-between;
  //border: 1px inset;
`;

const Title = styled.p<{ checked: boolean }>`
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 500;
  color: ${({ checked }) => (checked ? "#028d09" : "#000")};
  margin-right: 2rem;
`;

const Deadline = styled.p`
  font-size: 1rem;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 1rem;
`;

const Item: FC<Task> = ({ taskName, completed, id, deadline, createdAt }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(taskName);
  const [checked, setChecked] = useState(completed);
  const { state, dispatch } = useContext(AppStore);

  const handleChange = useCallback(() => {
    dispatch({
      type: Type.editTask,
      payload: { id, completed: !checked, taskName: value },
    });
    firebase
      .database()
      .ref(`${state.uid}/tasks/${id}`)
      .update({
        taskName: value,
        completed: !checked,
      })
      .catch((e) => alert(e));
    setChecked(!checked);
    setEdit(false);
  }, [checked, dispatch, id, state.uid, value]);

  const handleDelete = useCallback(() => {
    firebase.database().ref(`${state.uid}/tasks/${id}`).remove();
    dispatch({ type: Type.deleteTask, payload: id });
  }, [dispatch, id, state.uid]);

  const handleEditMenu = useCallback(() => {
    setEdit(!edit);
  }, [edit]);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const time = new Date().getTime();

  return (
    <Container>
      <Box alignItems="center">
        <Checkbox onChange={handleChange} checked={checked}></Checkbox>

        {edit ? (
          <>
            <input value={value} onChange={handleChangeInput} />
            <button onClick={handleChange}>Save</button>
          </>
        ) : (
          <Title checked={checked}>{taskName}</Title>
        )}
      </Box>
      <Box alignItems="center">
        <Deadline>{formatDeadline(time, deadline)}</Deadline>
        <Box direction="column">
          <Button
            margin="0 0 0.125rem"
            type="button"
            color="green"
            onClick={handleEditMenu}
          >
            edit
          </Button>
          <Button type="button" color="red" onClick={handleDelete}>
            delete
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Item;
