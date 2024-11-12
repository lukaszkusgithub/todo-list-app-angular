// task-list.page.component.ts

import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ComponentListState,
  transition,
  SuccessState,
  ErrorState,
} from "../../state/list-state.machine";
import { Task } from "../../models/task.model";
import { TaskListService } from "../../services/tesks.service"; // Import the service
import { SubmitTextComponent } from "../submit-text/submit-text.component";
import { TasksListComponent } from "../tasks-list/tasks-list.component";
import { ListFetchingError } from "../../models/error.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [RouterModule, SubmitTextComponent, TasksListComponent, CommonModule],
  templateUrl: "./task-list.page.component.html",
  styles: ``,
})
export class TaskListPageComponent {
  listState: ComponentListState = { state: "idle" }; // Initial state set to 'idle'

  constructor(private taskListService: TaskListService) {
    this.fetchTasks(); // Start by fetching tasks when component is initialized
  }

  // Function to send events to the state machine
  send(event: { type: string; results?: Task[]; error?: ListFetchingError }) {
    this.listState = transition(this.listState, event as any);
  }

  // Fetch tasks from API using the service
  fetchTasks() {
    // Set state to 'loading'
    this.send({ type: "FETCH" });

    this.taskListService.fetchTasks().then((response) => {
      setTimeout(() => {
        if (Array.isArray(response)) {
          // On success, update state to 'success'
          this.send({ type: "SUCCESS", results: response });
        } else {
          // On error, update state to 'error'
          this.send({ type: "ERROR", error: response });
        }
      }, 1200);
    });
  }

  // Helper getters for the state
  get isSuccessState(): boolean {
    return this.listState.state === "success";
  }

  get isErrorState(): boolean {
    return this.listState.state === "error";
  }

  get isLoadingState(): boolean {
    return this.listState.state === "loading";
  }

  get isIdleState(): boolean {
    return this.listState.state === "idle";
  }

  // Getter for results in success state
  get results(): Task[] {
    return (this.listState as SuccessState).results;
  }

  // Getter for error in error state
  get error(): ListFetchingError {
    return (this.listState as ErrorState).error;
  }

  addTask($event: string) {
    // Placeholder for adding tasks functionality
    throw new Error("Method not implemented.");
  }
}
