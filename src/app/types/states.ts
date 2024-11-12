import { Task } from "../models/task.model";

export type ListFetchingError = { status: number; message: string };

// idle - initial
type IdleState = {
  state: "idle";
};
// Loading
type LoadingState = {
  state: "loading";
};
// Success
type SuccessState = {
  state: "success";
  results: Task[];
};
// Error
type ErrorState = {
  state: "error";
  error: ListFetchingError;
};

export type ComponentListstate = IdleState | LoadingState | SuccessState | ErrorState;

type State = "idle" | "loading" | "success" | "error";

type Event =
  | { type: "FETCH" }
  | { type: "SUCCESS"; results: Task[] }
  | { type: "ERROR"; error: ListFetchingError }
  | { type: "RETRY" };

type MachineState =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; results: Task[] }
  | { state: "error"; error: ListFetchingError };

function transition(state: MachineState, event: Event): MachineState {
  switch (state.state) {
    case "idle":
      if (event.type === "FETCH") return { state: "loading" };
      break;

    case "loading":
      if (event.type === "SUCCESS") return { state: "success", results: event.results };
      if (event.type === "ERROR") return { state: "error", error: event.error };
      break;

    case "error":
      if (event.type === "RETRY") return { state: "loading" };
      break;

    case "success":
      // Opcjonalnie można obsłużyć dodatkowe zdarzenia.
      break;
  }
  return state; // Jeśli zdarzenie nie jest dozwolone, zwracamy aktualny stan
}
