import { Component, Input } from "@angular/core";
import { Task } from "@models/task.model";
import { SubmitTextComponent } from "@shared-ui-components/submit-text/submit-text.component";
import { TasksListComponent } from "@task-components/ui/tasks-list/tasks-list.component";

@Component({
  selector: "app-success-state",
  standalone: true,
  imports: [SubmitTextComponent, TasksListComponent],
  templateUrl: "./success-state..component.html",
})
export class SuccessStateComponent {
  @Input() tasks: Task[] = [];
  @Input() addTask!: (taskName: string) => void;

  onSubmit(taskName: string) {
    this.addTask(taskName);
  }
}
