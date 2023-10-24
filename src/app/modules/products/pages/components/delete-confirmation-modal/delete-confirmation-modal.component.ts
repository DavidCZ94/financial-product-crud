import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent {
  @Input() showModal: boolean = false;
  @Input() productTitle: string = '';
  @Output() onCancel: EventEmitter<null> = new EventEmitter<null>();
  @Output() onConfirm: EventEmitter<null> = new EventEmitter<null>();
  errorMessage: string = 'Ha ocurrido un error, por favor recarga la pagina.';

  constructor(
  ){}

  confirm(): void {
    this.showModal = false;
    this.onConfirm.emit();
  }

  cancel(): void {
    this.showModal = false;
    this.onCancel.emit();
  }
}
