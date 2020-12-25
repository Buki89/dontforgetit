import firebase from "firebase";
import { useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Type } from "../store/Reducer";
import { AppStore } from "../store/store";

export const useForm = () => {
  const [input, setInput] = useState("");
  const [date, setDate] = useState<Date | null | undefined>(undefined);
  const [validate, setValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleDate = useCallback((event) => setDate(event), []);

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
      dispatch({ type: Type.setTask, payload: data });
      setValidate(false);
      setInput("");
      setDate(undefined);
      db.ref(`${uid}/tasks/${id}`).set(data);
    },
    [input, date, state.tasks, dispatch, db, uid]
  );

  return {
    input,
    date,
    validate,
    errorMessage,
    handleSubmit,
    handleDate,
    handleOnChange,
  };
};
