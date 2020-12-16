import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskProps } from "./Item";

export const useForm = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState<Date | null | undefined>(undefined);
  const [validate, setValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      setInput(input);
    },
    []
  );

  const handleDeleleTask = useCallback(
    (id: string) => {
      const newArr = tasks.filter((task: TaskProps) => {
        return task.id !== id;
      });
      setTasks(newArr);
    },
    [tasks]
  );

  const handleDate = useCallback((event) => setDate(event), []);

  const handleChangeCompleted = useCallback(
    (id: string) => {
      const newArr = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });

      setTasks(newArr);
    },
    [tasks]
  );
  const handleChangeTaskName = useCallback(
    (id: string, newValue: string) => {
      const newState = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            taskName: newValue,
          };
        }
        return task;
      });

      setTasks(newState);
    },
    [tasks]
  );

  // const handleChangeCompeted = useCallback(
  //   (id: string) => {
  //     const newState = tasks.map((task) => {
  //       return task.id === id ? { ...task, completed: !task.completed } : task;
  //     });
  //     return newState;
  //   },
  //   [tasks]
  // );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const alreadyUsed = tasks.some((item) => item.taskName === input);
      const emptyInput = input.length === 0;

      e.preventDefault();

      if (alreadyUsed) {
        setValidate(true);
        setErrorMessage("There is already task with that name");
        return;
      }
      if (emptyInput) {
        setValidate(true);
        setErrorMessage("Empty field");
        return;
      }
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          taskName: input,
          completed: false,
          deadline: date?.toLocaleDateString(),
          createdAt: new Date().toLocaleDateString(),
        },
      ]);
      setValidate(false);
      setInput("");
      setDate(undefined);
    },
    [input, tasks, date]
  );

  return {
    input,
    date,
    validate,
    errorMessage,
    tasks,
    handleSubmit,
    handleChangeTaskName,
    handleChangeCompleted,
    handleDate,
    handleDeleleTask,
    handleOnChange,
  };
};
