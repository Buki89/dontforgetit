import firebase from "firebase";
import { useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Type } from "../store/Reducer";
import { AppStore } from "../store/store";

export const useForm = () => {
  const [input, setInput] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [validate, setValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"all" | "completed" | "incompleted">(
    "all"
  );

  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.database();
  const { state, dispatch } = useContext(AppStore);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      setInput(input);
    },
    []
  );

  const openModal = useCallback(() => setOpen(!open), [open]);

  const handleDate = useCallback((event: Date) => setDate(event), []);

  const handleSortBy = useCallback((e) => {
    setSortBy(e.target.value);
    setPage(1);
  }, []);

  const handleChangePage = useCallback(
    (page: string) => setPage(parseInt(page, 10)),
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const id = uuidv4();
      const Task = {
        id,
        completed: false,
        deadline: date?.getTime() ?? 0,
        createdAt: new Date().getTime(),
        taskName: input,
      };
      const alreadyUsed = state.tasks.some((item) => item.taskName === input);
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
      dispatch({ type: Type.setTask, payload: { task: Task } });
      setValidate(false);
      setInput("");
      setDate(undefined);
      setOpen(!open);
      db.ref(`${uid}/tasks/${id}`).set(Task);
    },
    [input, date, state.tasks, dispatch, open, db, uid]
  );

  console.log(page);

  return {
    input,
    date,
    open,
    page,
    sortBy,
    validate,
    errorMessage,
    handleSubmit,
    handleDate,
    handleSortBy,
    handleOnChange,
    handleChangePage,
    openModal,
  };
};
