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
import { GetAllTasksSearchParams } from "./types/search-params.type";
import { TaskUpdatePayload } from "./types/tasks-payload.type";

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
  }

  fetchTasks(searchParams: GetAllTasksSearchParams) {
    this.send({ type: "FETCH" });

    this.tasksService.getAll(searchParams).then((response) => {
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
