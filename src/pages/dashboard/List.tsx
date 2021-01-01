import React from "react";
import { Task } from "../../store/Reducer";
import Item from "./Item";

type ListProps = {
  tasks: Task[];
  sort: "all" | "completed" | "incompleted";
  page: number;
  searchPhrase: string;
};

const List = React.memo(({ tasks, sort, page, searchPhrase }: ListProps) => {
  const to = 8 * page;
  const from = to - 8;

  return (
    <>
      {tasks.length > 0 &&
        tasks
          .filter((task) => {
            if (sort === "completed") {
              return task.completed === true;
            } else if (sort === "incompleted") {
              return task.completed === false;
            }
            return task;
          })
          .filter((task, index) => {
            if (sort === "completed") {
              return index <= to - 1 && index >= from;
            } else if (sort === "incompleted") {
              return index <= to - 1 && index >= from;
            }
            return index <= to - 1 && index >= from;
          })
          .filter((task) => {
            return task.taskName.includes(searchPhrase);
          })
          .map((task) => <Item key={task.id} {...task} />)}
    </>
  );
});

export default List;
