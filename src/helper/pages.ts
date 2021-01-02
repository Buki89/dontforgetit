import { DashboardState } from "../hooks/useForm";
import { State } from "../store/Reducer";

export const pages = (state:State, localState: DashboardState): number => {
    if (localState.sortBy === "all") {
      return Math.floor(state.tasks.length / 9) + 1;
    } else if (localState.sortBy === "completed") {
      return (
        Math.floor(
          state.tasks.filter((task) => task.completed === true).length / 9
        ) + 1
      );
    } else {
      return (
        Math.floor(
          state.tasks.filter((task) => task.completed === false).length / 9
        ) + 1
      );
    }
  };