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
import { GetAllTasksSearchParams } from "@custom-types/search-params.type";
import { TaskUpdatePayload } from "@custom-types/tasks-payload.type";

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
    // console.log(this.listState);
  }

  fetchTasks(searchParams: GetAllTasksSearchParams) {
    this.send({ type: "FETCH" });

    this.tasksService.getAll(searchParams).subscribe({
      next: (response) => {
        this.send({ type: "SUCCESS", results: response.body! });
      },
      error: (err) => {
        this.send({ type: "ERROR", error: err });
      },
    });
  }

  addTask(name: string) {
    if (this.listState.state === "success") {
      this.tasksService.add(name).subscribe({
        next: (results) => {
          this.send({
            type: "SUCCESS",
            results: [...(this.listState as SuccessState<Task>).results, results],
          });
        },
        error: (err) => {
          console.error("Error adding task:", err.message);
        },
      });
    }
  }

  deleteTask(taskId: number) {
    this.tasksService.delete(taskId).subscribe({
      next: () => {
        const updatedResults = (this.listState as SuccessState<Task>).results.filter(
          (task) => task.id !== taskId
        );
        this.send({ type: "SUCCESS", results: updatedResults });
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }

  updateTask(taskId: number, payload: TaskUpdatePayload) {
    this.tasksService.update(taskId, payload).subscribe({
      next: () => {
        const updatedResults = (this.listState as SuccessState<Task>).results.map(
          (task) => (task.id === taskId ? { ...task, ...payload } : task)
        );
        this.send({ type: "SUCCESS", results: updatedResults });
        console.log(updatedResults);
      },
      error: (err) => {
        console.error(err.message);
      },
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
