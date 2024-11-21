import { Component, EventEmitter, Output, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { TASK_STATUS, TaskStatus } from "@models/task-status.enum";
import { FormValue } from "@services/types/form-value.type";
import { SORT_BY, SortBy } from "@shared-enums/sort-by.enums";

type TasksListFiltersForm = FormGroup<{
  searchTerm: FormControl<string>;
  status: FormControl<TaskStatus>;
  sortBy: FormControl<SortBy>;
}>;

export type TasksListFiltersFormValue = FormValue<TasksListFiltersForm>;

@Component({
  standalone: true,
  selector: "app-tasks-list-filters",
  imports: [ReactiveFormsModule],
  templateUrl: "./tasks-list-filter.component.html",
  styleUrl: "./tasks-list-filter.component.scss",
})
export class TasksListFiltersComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  @Output() filtersChange = new EventEmitter<TasksListFiltersFormValue>();

  form: TasksListFiltersForm = this.formBuilder.group({
    searchTerm: this.formBuilder.control<string>(""),
    sortBy: this.formBuilder.control<SortBy>(SORT_BY.DESC),
    status: this.formBuilder.control<TaskStatus>(TASK_STATUS.ALL),
  });

  protected sortOptions = SORT_BY;
  protected statusOptions = TASK_STATUS;

  sort(sort: SortBy) {
    this.form.patchValue({
      sortBy: sort,
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe().subscribe(() => {
      this.filtersChange.emit(this.form.getRawValue());
    });
  }
}