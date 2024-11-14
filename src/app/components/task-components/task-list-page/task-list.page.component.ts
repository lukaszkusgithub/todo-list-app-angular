import { Component, inject, OnInit } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SuccessStateComponent } from "@state-components/success-state/success-state.component";
import { LoadingStateComponent } from "@state-components/loading-state/loading-state.component";
import { ErrorStateComponent } from "@state-components/error-state/error-state.component";
import { IdleStateComponent } from "@state-components/idle-state/idle-state.component";
import { TaskListStateService } from "@services/tasks-list-state.service";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [
    SuccessStateComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    IdleStateComponent,
    CommonModule,
  ],
  templateUrl: "./task-list.page.component.html",
})
export class TaskListPageComponent implements OnInit {
  private stateService = inject(TaskListStateService);

  ngOnInit() {
    this.stateService.fetchTasks();
  }

  get listState() {
    return this.stateService.state;
  }

  get results() {
    return this.stateService.getResults();
  }

  get error() {
    return this.stateService.getError();
  }

  get isIdleState() {
    return this.listState.state === "idle";
  }

  get isErrorState() {
    return this.listState.state === "error";
  }

  fetchTasks() {
    this.stateService.fetchTasks();
  }

  addTask(taskName: string) {
    this.stateService.addTask(taskName);
  }
}
