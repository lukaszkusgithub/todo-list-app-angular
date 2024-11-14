import { Component, Input } from "@angular/core";
import { ListFetchingError } from "@models/error.model";

@Component({
  selector: "app-error-state",
  standalone: true,
  templateUrl: "./error-state..component.html",
})
export class ErrorStateComponent {
  @Input() error!: ListFetchingError;
}
