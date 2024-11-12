import { Task } from "../models/task.model";
import { ListFetchingError } from "../models/error.model";

// States of the machine
type IdleState = { state: "idle" };
type LoadingState = { state: "loading" };
export type SuccessState = { state: "success"; results: Task[] };
export type ErrorState = { state: "error"; error: ListFetchingError };

// The machine can be in one of these states
export type ComponentListState = IdleState | LoadingState | SuccessState | ErrorState;

// Events that can trigger state transitions
type Event =
  | { type: "FETCH" }
  | { type: "SUCCESS"; results: Task[] }
  | { type: "ERROR"; error: ListFetchingError }
  | { type: "RETRY" };

// Transition function between states
export function transition(state: ComponentListState, event: Event): ComponentListState {
  switch (state.state) {
    case "idle":
      if (event.type === "FETCH") {
        return { state: "loading" };
      }
      break;

    case "loading":
      if (event.type === "SUCCESS") {
        return { state: "success", results: event.results };
      }
      if (event.type === "ERROR") {
        return { state: "error", error: event.error };
      }
      break;

    case "error":
      if (event.type === "RETRY") {
        return { state: "loading" };
      }
      break;

    case "success":
      // Optionally, handle other events in success state
      break;
  }

  return state; // If the event is not handled, return the current state
}
