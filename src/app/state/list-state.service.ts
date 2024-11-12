import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ComponentListState, transition } from "./list-state.machine";
import { Task } from "../models/task.model";
import { ListFetchingError } from "../models/error.model";

// Injectable service for managing the list state
@Injectable({ providedIn: "root" })
export class ListStateService {
  // BehaviorSubject to hold the current state of the list, initial state is 'idle'
  private state = new BehaviorSubject<ComponentListState>({ state: "idle" });

  // Observable stream of the state that can be subscribed to
  state$ = this.state.asObservable();

  // Function to dispatch events that trigger state transitions
  send(event: { type: string; results?: Task[]; error?: ListFetchingError }) {
    const currentState = this.state.getValue(); // Get the current state
    const newState = transition(currentState, event as any); // Transition to a new state based on the event
    this.state.next(newState); // Update the current state
  }
}
