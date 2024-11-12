// task-list.service.ts

import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { ListFetchingError } from "../models/error.model";

@Injectable({
  providedIn: "root", // The service will be available globally in the application
})
export class TaskListService {
  private readonly URL = "http://localhost:3000"; // API endpoint for tasks

  constructor() {}

  // Function to fetch tasks from the API
  fetchTasks(): Promise<Task[] | ListFetchingError> {
    return fetch(`${this.URL}/tasks`) // Make a GET request to the tasks endpoint
      .then<Task[] | ListFetchingError>((response) => {
        if (response.ok) {
          return response.json(); // If the response is successful, return the parsed JSON data
        }
        // If there is an error (non-2xx response), return an error object
        return { status: response.status, message: response.statusText };
      });
  }
}
