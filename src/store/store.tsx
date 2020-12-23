import React, { createContext, FC, useReducer } from "react";
import Reducer, { Actions, State } from "./Reducer";

interface IContextProps {
  state: State;
  dispatch: React.Dispatch<Actions>;
}

const initialState = {
  tasks: [],
  uid: "",
} as State;

export const AppStore = createContext({} as IContextProps);

const Store: FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const value = { state, dispatch };

  return <AppStore.Provider value={value}>{children}</AppStore.Provider>;
};

export default Store;
