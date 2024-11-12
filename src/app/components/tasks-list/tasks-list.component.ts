import { Component, Input } from "@angular/core";
import { Task } from "../../models/task.model";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-tasks-list",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: `./tasks-list.component.html`,
  styles: [],
})
export class TasksListComponent {
  @Input({ required: true }) tasks: Task[] = [];

  toggleDoneStatus(task: Task) {
    task.done = !task.done;
  }
}
