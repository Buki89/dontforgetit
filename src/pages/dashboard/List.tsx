import React from "react";
import { Task } from "../../store/Reducer";
import Item from "./Item";

type ListProps = {
  tasks: Task[];
};

const List = React.memo(({ tasks, ...props }: ListProps) => {
  return (
    <>
      {tasks.length > 0 &&
        tasks.map((task) => <Item key={task.id} {...task} {...props} />)}
    </>
  );
});

export default List;
