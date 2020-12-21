import React from "react";
import Box from "../../primitives/components/Box";
import Item, { TaskProps } from "./Item";

type ListProps = {
  tasks: TaskProps[];
  handleChangeTask?: (id: string, checked?: boolean, value?: string) => void;
  handleDeleleTask?: (id: string) => void;
};

const List = React.memo(({ tasks, ...props }: ListProps) => {
  console.log("List re render");

  return (
    <Box direction="column" margin="2rem 0">
      {tasks.length > 0 &&
        tasks.map((task) => <Item key={task.id} {...task} {...props} />)}
    </Box>
  );
});

export default List;
