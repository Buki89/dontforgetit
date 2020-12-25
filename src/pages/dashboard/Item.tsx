import React, { FC, useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { Task, Type } from "../../store/Reducer";
import { AppStore } from "../../store/store";
import { firebase } from "../../firebase/config";

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 4rem;
  border: 1px solid grey;
  border-radius: 6px;
  padding: 0 2rem;
  margin: 0.25rem 0;
  min-width: 60vw;
`;

const Title = styled.p<{ checked: boolean }>`
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 500;
  color: ${({ checked }) => (checked ? "#028d09" : "#000")};
  margin-right: 2rem;
`;

const Item: FC<Task> = ({ taskName, completed, id, deadline }) => {
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

  return (
    <Container>
      {edit ? (
        <>
          <input value={value} onChange={handleChangeInput} />
          <button onClick={handleChange}>Save</button>
        </>
      ) : (
        <Title checked={checked}>{taskName}</Title>
      )}
      <p>{deadline}</p>
      <input onChange={handleChange} checked={checked} type="checkbox"></input>
      <button onClick={handleEditMenu}>edit</button>
      <button onClick={handleDelete}>delete</button>
    </Container>
  );
};

export default Item;
