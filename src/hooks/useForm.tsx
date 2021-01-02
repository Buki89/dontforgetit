import firebase from "firebase";
import { useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Type } from "../store/Reducer";
import { AppStore } from "../store/store";

export type DashboardState = {
  taskName: string;
  deadline: Date | undefined;
  validate: boolean;
  errorMessage: string;
  open: boolean;
  activePage: number;
  sortBy: "all" | "completed" | "incompleted";
  searchPhrase: string;
};

const defaultValues = {
  taskName: "",
  errorMessage: "",
  sortBy: "all",
  searchPhrase: "",
  deadline: undefined,
  validate: false,
  open: false,
  activePage: 1,
} as DashboardState;

export const useForm = () => {
  const [localState, setLocalState] = useState<DashboardState>(defaultValues);

  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.database();
  const { state, dispatch } = useContext(AppStore);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      setLocalState({
        ...localState,
        taskName: input,
      });
    },
    [localState]
  );

  const openModal = useCallback(
    () => setLocalState({ ...localState, open: !localState.open }),
    [localState]
  );

  const handleDeadline = useCallback(
    (event: Date) => setLocalState({ ...localState, deadline: event }),
    [localState]
  );

  const handleSortBy = useCallback(
    (e) => {
      setLocalState({ ...localState, sortBy: e.target.value, activePage: 1 });
    },
    [localState]
  );

  const handleChangePage = useCallback(
    (page: string) =>
      setLocalState({ ...localState, activePage: parseInt(page, 10) }),
    [localState]
  );

  const handleSearch = useCallback(
    (e) => setLocalState({ ...localState, searchPhrase: e.target.value }),
    [localState]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const id = uuidv4();
      const Task = {
        id,
        completed: false,
        deadline: localState.deadline?.getTime() ?? 0,
        createdAt: new Date().getTime(),
        taskName: localState.taskName,
      };
      const alreadyUsed = state.tasks.some(
        (item) => item.taskName === localState.taskName
      );
      const emptyInput = localState.taskName.length === 0;

      e.preventDefault();

      if (alreadyUsed) {
        setLocalState({
          ...localState,
          validate: true,
          errorMessage: "There is already task with that name",
        });
        return;
      }
      if (emptyInput) {
        setLocalState({
          ...localState,
          validate: true,
          errorMessage: "Empty field",
        });
        return;
      }
      dispatch({ type: Type.setTask, payload: { task: Task } });
      setLocalState({
        ...localState,
        taskName: "",
        deadline: undefined,
        validate: false,
        open: !localState.open,
      });
      db.ref(`${uid}/tasks/${id}`).set(Task);
    },
    [localState, state.tasks, dispatch, db, uid]
  );

  return {
    localState,
    handleSubmit,
    handleDate: handleDeadline,
    handleSortBy,
    handleOnChange,
    handleSearch,
    handleChangePage,
    openModal,
  };
};
