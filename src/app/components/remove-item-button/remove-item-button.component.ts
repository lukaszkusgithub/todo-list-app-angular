import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  featherTrash2,
  featherUser,
  featherCheck,
  featherX,
} from "@ng-icons/feather-icons";

@Component({
  selector: "app-remove-item-button",
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ featherTrash2, featherUser, featherCheck, featherX })],
  templateUrl: "./remove-item-button.component.html",
  styles: [
    `
      .icon--hover {
        @apply hover:text-red-700 hover:rounded-full;
      }
    `,
  ],
})
export class RemoveItemButtonComponent {
  @Output() confirm = new EventEmitter<void>();

  removeMode = false;
}
