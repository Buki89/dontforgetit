import React from "react";
import { Task } from "../../store/Reducer";
import Item from "./Item";

type ListProps = {
  tasks: Task[];
  sort: "all" | "completed" | "incompleted";
  page: number;
};

const List = ({ tasks, sort, page }: ListProps) => {
  const to = 8 * page;
  const from = to - 8;

  return (
    <>
      {tasks.length > 0 &&
        tasks
          .filter((task, index) => {
            if (sort === "completed") {
              return index <= to && index > from && task.completed === true;
            } else if (sort === "incompleted") {
              return index <= to && index > from && task.completed === false;
            }
            return index <= to && index > from;
          })
          .map((task) => <Item key={task.id} {...task} />)}
    </>
  );
};

export default List;
