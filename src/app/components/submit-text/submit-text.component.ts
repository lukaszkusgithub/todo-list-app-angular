import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-submit-text",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: `./submit-text.component.html`,
  styles: `
      input:focus + button {
        @apply text-orange-400;
      }`,
})
export class SubmitTextComponent {
  @Output() submitText = new EventEmitter<string>();
}
