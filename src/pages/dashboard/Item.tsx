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
`;

export type TaskProps = {
  id: string;
  taskName: string;
  completed: boolean;
  deadline?: string;
  createdAt: string;
  handleDeleleTask?: (id: string) => void;
  handleChangeCompleted?: (id: string) => void;
  handleChangeTaskName?: (id: string, newValue: string) => void;
};
const Title = styled.p<{ checked: boolean }>`
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 500;
  color: ${({ checked }) => (checked ? "#028d09" : "#000")};
  margin-right: 2rem;
`;

const Item: FC<TaskProps> = ({
  taskName,
  completed,
  id,
  deadline,
  handleDeleleTask,
  handleChangeCompleted,
  handleChangeTaskName,
}) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    () => handleChangeCompleted && handleChangeCompleted(id),
    [handleChangeCompleted, id]
  );

  const handleDelete = useCallback(
    () => handleDeleleTask && handleDeleleTask(id),
    [handleDeleleTask, id]
  );

  const handleEditTask = useCallback(() => {
    setEdit(!edit);
  }, [edit]);

  const handleChangeEditedValue = useCallback(() => {
    handleChangeTaskName && handleChangeTaskName(id, value);
    setEdit(false);
  }, [handleChangeTaskName, id, value]);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return (
    <Task>
      {edit ? (
        <>
          <input value={value} onChange={handleChangeInput} />
          <button onClick={handleChangeEditedValue}>Save</button>
        </>
      ) : (
        <Title checked={completed}>{taskName}</Title>
      )}
      <p>{deadline}</p>
      <input
        onChange={handleChange}
        checked={completed}
        type="checkbox"
      ></input>
      <button onClick={handleEditTask}>edit</button>
      <button onClick={handleDelete}>delete</button>
    </Task>
  );
};

export default Item;
