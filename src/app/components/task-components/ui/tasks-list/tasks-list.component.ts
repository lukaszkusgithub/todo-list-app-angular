import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Task } from "@models/task.model";
import { TaskCardComponent } from "@task-components/ui/task-card/task-card.component";
import { TaskUpdatePayload } from "../../../../types/tasks-payload.type";
import { TaskListStateService } from "@services/tasks-list-state.service";

@Component({
  selector: "app-tasks-list",
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: `./tasks-list.component.html`,
  styles: [],
})
export class TasksListComponent {
  @Input({ required: true }) tasks: Task[] = [];

  private tasksService = inject(TaskListStateService);

  delete(taskId: number) {
    this.tasksService.deleteTask(taskId);
  }

  updateTask(taskId: number, updatedTask: TaskUpdatePayload) {
    this.tasksService.updateTask(taskId, updatedTask);
  }
}
