import React from "react";
import Item, { TaskProps } from "./Item";

type ListProps = {
  tasks: TaskProps[];
  handleChangeCompleted?: (id: string) => void;
  handleChangeTaskName?: (id: string, newValue: string) => void;
  handleDeleleTask?: (id: string) => void;
};

const List = React.memo(({ tasks, ...props }: ListProps) => {
  console.log("List re render");

  return (
    <>
      {tasks.length > 0 &&
        tasks.map((task) => <Item key={task.id} {...task} {...props} />)}
    </>
  );
});

export default List;
