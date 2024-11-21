import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GetAllTasksSearchParams } from "@custom-types/search-params.type";
import { TaskUpdatePayload } from "@custom-types/tasks-payload.type";
import { ListFetchingError } from "@models/error.model";
import { Task } from "@models/task.model";
import { wait } from "@utils/wait";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskListService {
  private readonly URL = "http://localhost:3000"; // API endpoint for tasks

  private http = inject(HttpClient);

  getAll(searchParams: GetAllTasksSearchParams) {
    return this.http.get<Task[]>(`${this.URL}/tasks`, {
      observe: "response",
      params: searchParams,
    });
  }

  delete(taskId: number): Observable<Task> {
    return this.http.delete<Task>(`${this.URL}/tasks/${taskId}`);
  }

  update(taskId: number, payload: TaskUpdatePayload) {
    const bodyData = JSON.stringify({
      ...(payload.done !== undefined && { done: payload.done }),
      ...(payload.name !== undefined && { name: payload.name }),
    });

    console.log(bodyData);
    return this.http.patch<Task>(`${this.URL}/tasks/${taskId}`, bodyData);
  }

  add(name: string) {
    return this.http.post<Task>(`${this.URL}/tasks`, {
      createdAt: new Date().getTime(),
      name,
      done: false,
    });
  }
}
