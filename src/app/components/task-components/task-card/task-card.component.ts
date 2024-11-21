import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherCalendar } from "@ng-icons/feather-icons";
import { RemoveItemButtonComponent } from "@ui-components/remove-item-button/remove-item-button.component";
import { AutosizeTextareaComponent } from "@ui-components/autosize-textarea/autosize-texarea.component";
import { Task } from "@models/task.model";
import { TaskUpdatePayload } from "@services/tasks-list-state.service";
import { CustomDatePipe } from "@utils/pipes/custom-date.pipe";

@Component({
  selector: "app-task-card",
  standalone: true,
  viewProviders: [provideIcons({ featherCalendar })],
  imports: [
    CommonModule,
    NgIconComponent,
    CustomDatePipe,
    RemoveItemButtonComponent,
    AutosizeTextareaComponent,
  ],
  templateUrl: `./task-card.component.html`,
  styles: [],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() update = new EventEmitter<TaskUpdatePayload>();
  @Output() delete = new EventEmitter<void>();

  removeMode = false;
  editMode = false;

  isSingleClick = true;

  updateTaskName(updatedName: string) {
    this.update.emit({ name: updatedName });

    this.editMode = false;
  }

  handleSingleClick() {
    this.isSingleClick = true;

    setTimeout(() => {
      if (this.isSingleClick) {
        this.update.emit({ done: !this.task.done });
      }
    }, 200);
  }

  switchToEditMode() {
    this.isSingleClick = false;
    this.editMode = true;
  }
}
