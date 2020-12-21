import firebase from "firebase";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskProps } from "../pages/dashboard/Item";

export const useForm = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState<Date | null | undefined>(undefined);
  const [validate, setValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const uid = firebase.auth().currentUser?.uid;

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
      firebase.database().ref(`${uid}/tasks/${id}`).remove();
    },
    [tasks, uid]
  );

  const handleDate = useCallback((event) => setDate(event), []);

  const handleChangeTask = useCallback(
    (id: string, checked?: boolean, value?: string) => {
      console.log("handleChangeCompleted" + id, checked, value);
      const newArr = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            taskName: value ? value : task.taskName,
            completed: checked ? checked : task.completed,
          };
        }
        return task;
      });
      setTasks(newArr);
      firebase
        .database()
        .ref(`${uid}/tasks/${id}`)
        .update({
          taskName: value && value,
          completed: checked && checked,
        });
    },
    [tasks, uid]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const id = uuidv4();
      const data = {
        id: id,
        taskName: input,
        completed: false,
        deadline: date?.toLocaleDateString() ?? "",
        createdAt: new Date().toLocaleDateString(),
      };
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
      setTasks([...tasks, data]);
      setValidate(false);
      setInput("");
      setDate(undefined);
      firebase.database().ref(`${uid}/tasks/${id}`).set(data);
    },
    [input, date, tasks, uid]
  );

  console.log(tasks);

  return {
    input,
    date,
    validate,
    errorMessage,
    tasks,
    setTasks,
    handleSubmit,
    handleChangeTask,
    handleDate,
    handleDeleleTask,
    handleOnChange,
  };
};
