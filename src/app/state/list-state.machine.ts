import { ListFetchingError } from "@models/error.model";
import { Task } from "@models/task.model";

// States of the machine
interface IdleState {
  state: "idle";
}
interface LoadingState {
  state: "loading";
}
export interface SuccessState<T> {
  state: "success";
  results: T[];
}
export interface ErrorState {
  state: "error";
  error: ListFetchingError;
}

// The machine can be in one of these states
export type ComponentListState<T> =
  | IdleState
  | LoadingState
  | SuccessState<T>
  | ErrorState;

// Events that can trigger state transitions
export type Event =
  | { type: "FETCH" }
  | { type: "SUCCESS"; results: Task[] }
  | { type: "ERROR"; error: ListFetchingError }
  | { type: "RETRY" };

// Transition function between states
export function transition(
  state: ComponentListState<Task>,
  event: Event
): ComponentListState<Task> {
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
        return { state: "loading" }; // Retry by going back to loading state
      }
      break;

    case "success":
      // Optionally, handle other events in success state
      break;
  }

  return state; // If the event is not handled, return the current state
}
