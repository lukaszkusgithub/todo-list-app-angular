import { Injectable } from "@angular/core";
import {
  ComponentListState,
  transition,
  SuccessState,
  ErrorState,
  Event,
} from "../state/list-state.machine";
import { TaskListService } from "./data-access/tasks.service";
import { Task } from "@models/task.model";
import { ListFetchingError } from "@models/error.model";

export interface TaskUpdatePayload {
  done?: boolean;
  name?: string;
}

@Injectable({
  providedIn: "root",
})
export class TaskListStateService {
  private listState: ComponentListState<Task> = { state: "idle" };

  constructor(private tasksService: TaskListService) {}

  get state(): ComponentListState<Task> {
    return this.listState;
  }

  send(event: Event) {
    this.listState = transition(this.listState, event);
    if (this.listState.state === "success") {
      console.log(this.listState.results);
    }
  }

  fetchTasks() {
    this.send({ type: "FETCH" });

    this.tasksService.getAll().then((response) => {
      if (Array.isArray(response)) {
        this.send({ type: "SUCCESS", results: response });
      } else {
        this.send({ type: "ERROR", error: response });
      }
    });
  }

  addTask(name: string) {
    if (this.listState.state === "success") {
      this.tasksService.add(name).then((response) => {
        if ("id" in response) {
          console.log("add Taks", response);
          console.log("add teks + resp", [
            ...(this.listState as SuccessState<Task>).results,
            response,
          ]);

          this.send({
            type: "SUCCESS",
            results: [...(this.listState as SuccessState<Task>).results, response],
          });
        } else {
          console.error("Error adding task:", response.message);
        }
      });
    }
  }

  deleteTask(taskId: number) {
    this.tasksService.delete(taskId).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
      } else if (this.listState.state === "success") {
        const updatedResults = (this.listState as SuccessState<Task>).results.filter(
          (task) => task.id !== taskId
        );
        this.send({ type: "SUCCESS", results: updatedResults });
      }
    });
  }

  updateTask(taskId: number, payload: TaskUpdatePayload) {
    this.tasksService.update(taskId, payload).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
      } else if (this.listState.state === "success") {
        const updatedResults = (this.listState as SuccessState<Task>).results.map(
          (task) => (task.id === taskId ? { ...task, ...payload } : task)
        );
        this.send({ type: "SUCCESS", results: updatedResults });
      }
    });
  }

  getResults(): Task[] {
    if (this.listState.state === "success") {
      return (this.listState as SuccessState<Task>).results;
    }
    return [];
  }

  getError(): ListFetchingError {
    if (this.listState.state === "error") {
      return (this.listState as ErrorState).error;
    }
    return { status: 500, message: "Unknown error" };
  }
}
