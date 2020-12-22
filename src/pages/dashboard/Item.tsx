import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";

const Task = styled.div`
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

export type TaskProps = {
  id: string;
  taskName: string;
  completed: boolean;
  deadline?: string;
  createdAt: string;
  handleChangeTask?: (id: string, checked: boolean, value: string) => void;
  handleDeleleTask?: (id: string) => void;
};

const Item: FC<TaskProps> = ({
  taskName,
  completed,
  id,
  deadline,
  handleChangeTask,
  handleDeleleTask,
}) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(taskName);
  const [checked, setChecked] = useState(completed);

  const handleChange = useCallback(() => {
    handleChangeTask && handleChangeTask(id, !checked, value);
    setChecked(!checked);
    setEdit(false);
  }, [checked, handleChangeTask, id, value]);

  const handleDelete = useCallback(
    () => handleDeleleTask && handleDeleleTask(id),
    [handleDeleleTask, id]
  );

  const handleEditTask = useCallback(() => {
    setEdit(!edit);
  }, [edit]);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  console.log(taskName + "taks re render");
  console.log(checked);

  return (
    <Task>
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
      <button onClick={handleEditTask}>edit</button>
      <button onClick={handleDelete}>delete</button>
    </Task>
  );
};

export default Item;
