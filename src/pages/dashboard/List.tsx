import React, { FC } from "react";
import Item, { TaskProps } from "./Item";

type ListProps = {
  tasks: TaskProps[];
  handleDeleleTask: (id: string) => void;
  handleChangeCompleted: (id: string) => void;
  handleChangeTaskName: (id: string, newValue: string) => void;
};

const List: FC<ListProps> = ({ tasks, ...props }) => {
  return (
    <>
      {tasks.length !== 0 &&
        tasks.map((task) => <Item key={task.id} {...task} {...props} />)}
    </>
  );
};

export default List;
