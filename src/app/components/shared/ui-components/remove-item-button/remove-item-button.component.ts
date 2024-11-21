import { ChangeDetectorRef, Component, EventEmitter, Output } from "@angular/core";
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
  styleUrl: "./remove-item-button.component.scss",
})
export class RemoveItemButtonComponent {
  @Output() confirm = new EventEmitter<void>();

  removeMode = false;

  toggleRemoveMode(event: Event) {
    event.stopPropagation(); // Zatrzymuje propagację kliknięcia
    this.removeMode = true; // Włącza tryb usuwania
  }

  cancelRemoveMode(event: Event) {
    event.stopPropagation(); // Zatrzymuje propagację kliknięcia
    this.removeMode = false; // Anuluje tryb usuwania
  }
}
