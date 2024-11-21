import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { getAllTasksSearchParams } from "@services/data-access/tasks-filter.adapter";
import { TaskListStateService } from "@services/tasks-list-state.service";
import { GetAllTasksSearchParams } from "@services/types/search-params.type";
import { ErrorStateComponent } from "@state-components/error-state/error-state.component";
import { IdleStateComponent } from "@state-components/idle-state/idle-state.component";
import { LoadingStateComponent } from "@state-components/loading-state/loading-state.component";
import { SuccessStateComponent } from "@state-components/success-state/success-state.component";
import {
  TasksListFiltersComponent,
  TasksListFiltersFormValue,
} from "@task-components/ui/tasks-list-filter/tasks-list-filter.component";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [
    SuccessStateComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    IdleStateComponent,
    CommonModule,
    TasksListFiltersComponent,
  ],
  templateUrl: "./task-list.page.component.html",
})
export class TaskListPageComponent implements OnInit {
  private stateService = inject(TaskListStateService);

  handleFiltersChange(filters: TasksListFiltersFormValue): void {
    this.fetchTasks(getAllTasksSearchParams(filters));
  }

  ngOnInit() {
    // this.fetchTasks(getAllTasksSearchParams(filters));
    // this.form.valueChanges.subscribe(() => {
    //   this.fetchTasks(getAllTaskSearchParams(this.form.getRawValue()));
    // });
    // this.fetchTasks(getAllTasksSearchParams(this.form.getRawValue()));
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

  fetchTasks(searchParams: GetAllTasksSearchParams) {
    this.stateService.fetchTasks(searchParams);
  }

  addTask(taskName: string) {
    this.stateService.addTask(taskName);
  }
}
