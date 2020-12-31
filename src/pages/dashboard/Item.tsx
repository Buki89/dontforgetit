import React, { FC, useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { Task, Type } from "../../store/Reducer";
import { AppStore } from "../../store/store";
import { firebase } from "../../firebase/config";
import Box from "../../primitives/components/Box";
//import { formatDeadline } from "../../helper/formatDeadline";
import { Checkbox } from "../../primitives";
import { FaEdit, FaTrash } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 3rem;
  width: 100%;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const Title = styled.p<{ checked: boolean }>`
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 500;
  color: ${({ checked, theme }) => (checked ? theme.colors.ligthGrey : "#000")};
  margin-right: 2rem;
  font-family: "Yanone + Kaffeesatz";
  text-decoration: ${({ checked }) => checked && "line-through"};
`;

// const Deadline = styled.p`
//   font-size: 1rem;
//   line-height: 1.2;
//   color: ${({ theme }) => theme.colors.black};
//   margin-right: 1rem;
// `;

const Item: FC<Task> = ({ taskName, completed, id, deadline, createdAt }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(taskName);
  const [showActions, setShowActions] = useState(false);
  const [checked, setChecked] = useState(completed);
  const { state, dispatch } = useContext(AppStore);

  const handleChange = useCallback(() => {
    dispatch({
      type: Type.editTask,
      payload: { id, completed: checked, taskName: value },
    });
    firebase
      .database()
      .ref(`${state.uid}/tasks/${id}`)
      .update({
        taskName: value,
        completed: checked,
      })
      .catch((e) => alert(e));
    setChecked(checked);
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
  const handleClick = useCallback(() => {
    setShowActions(!showActions);
  }, [showActions]);

  return (
    <Container>
      <Box alignItems="center">
        {edit ? (
          <>
            <input value={value} onChange={handleChangeInput} />
            <button onClick={handleChange}>Save</button>
          </>
        ) : (
          <Title onClick={handleClick} checked={checked}>
            {taskName}
          </Title>
        )}
      </Box>
      <Box alignItems="center">
        {/* <Deadline>{formatDeadline(time, deadline)}</Deadline> */}
        {showActions && (
          <>
            <FaEdit color="green" onClick={handleEditMenu} />
            <FaTrash color="red" onClick={handleDelete} />
          </>
        )}
        <Box justifyContent="flex-end">
          <Checkbox onChange={handleChange} checked={checked}></Checkbox>
        </Box>
      </Box>
    </Container>
  );
};

export default Item;
