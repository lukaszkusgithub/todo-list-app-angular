import { Injectable } from "@angular/core";
import { ListFetchingError } from "@models/error.model";
import { Task } from "@models/task.model";
import { wait } from "@utils/wait";

@Injectable({
  providedIn: "root",
})
export class TaskListService {
  private readonly URL = "http://localhost:3000"; // API endpoint for tasks

  async getAll() {
    await wait();

    return fetch(`${this.URL}/tasks`).then<Task[] | ListFetchingError>((response) => {
      if (response.ok) {
        return response.json();
      }

      return { status: response.status, message: response.statusText };
    });
  }

  async delete(taskId: number): Promise<Error | undefined> {
    return fetch(`${this.URL}/tasks/${taskId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        return new Error("Cannot delete task");
      }
      return undefined;
    });
  }

  async update(taskId: number, name: string) {
    return fetch(`${this.URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then<Task | Error>((response) => {
      if (response.ok) {
        return response.json();
      }

      return new Error("Cant update task");
    });
  }

  async add(name: string) {
    await wait();

    return fetch(`${this.URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdAt: new Date().getTime(),
        name,
        done: false,
      } as Task),
    }).then<Task | Error>((response) => {
      if (response.ok) {
        return response.json();
      }

      return new Error("Cant add task");
    });
  }
}
