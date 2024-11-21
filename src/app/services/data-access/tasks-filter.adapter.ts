import { TASK_STATUS } from "@models/task-status.enum";
import { GetAllTasksSearchParams } from "@services/types/search-params.type";
import { TasksListFiltersFormValue } from "@task-components/ui/tasks-list-filter/tasks-list-filter.component";

export function getAllTasksSearchParams(
  formValue: TasksListFiltersFormValue
): GetAllTasksSearchParams {
  let searchParams = {
    _sort: "createdAt",
    _order: formValue.sortBy.toLocaleLowerCase(),
    q: formValue.searchTerm,
  } as GetAllTasksSearchParams;

  if (formValue.status === TASK_STATUS.TODO) {
    searchParams.done_like = "false";
  } else if (formValue.status === TASK_STATUS.DONE) {
    searchParams.done_like = "true";
  } else {
    searchParams.done_like = "";
  }

  return searchParams;
}
