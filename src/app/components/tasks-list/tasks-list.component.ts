import { Component, inject, Input } from "@angular/core";
import { Task } from "../../models/task.model";
import { CommonModule } from "@angular/common";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherCalendar } from "@ng-icons/feather-icons";
import { RemoveItemButtonComponent } from "../remove-item-button/remove-item-button.component";
import { AutosizeTextareaComponent } from "../autosize-textarea/autosize-texarea.component";
import { TaskListStateService } from "../../services/tasks-list-state.service";

@Component({
  selector: "app-tasks-list",
  standalone: true,
  viewProviders: [provideIcons({ featherCalendar })],
  imports: [
    CommonModule,
    NgIconComponent,
    RemoveItemButtonComponent,
    AutosizeTextareaComponent,
  ],
  templateUrl: `./tasks-list.component.html`,
  styles: [],
})
export class TasksListComponent {
  @Input({ required: true }) tasks: Task[] = [];
  removeMode = false;
  editMode = false;

  isSingleClick = true;

  private tasksService = inject(TaskListStateService);

  delete(taskId: number) {
    this.tasksService.deleteTask(taskId);
  }

  updateTask(taskId: number, updatedName: string) {
    this.tasksService.updateTask(taskId, updatedName);
  }

  handleSingleClick(task: Task) {
    this.isSingleClick = true;

    setTimeout(() => {
      if (this.isSingleClick) {
        this.toggleDoneStatus(task);
      }
    }, 150);
  }

  switchToEditMode() {
    this.isSingleClick = false;
    this.editMode = true;
  }

  toggleDoneStatus(task: Task) {
    task.done = !task.done;
  }
}
