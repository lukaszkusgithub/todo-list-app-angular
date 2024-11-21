import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-autosize-textarea",
  standalone: true,
  templateUrl: "./autosize-texarea.component.html",
  styles: [],
})
export class AutosizeTextareaComponent {
  @Input() placeholder = "";
  @Input() value = "";
  @Input() clearAfterEmit = false;

  @Output() submitText = new EventEmitter<string>();

  protected emit(textarea: HTMLTextAreaElement) {
    this.submitText.emit(textarea.value);

    if (this.clearAfterEmit) {
      textarea.value = "";
    }
  }

  protected calcHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = textarea.scrollHeight + "px";
  }
}
