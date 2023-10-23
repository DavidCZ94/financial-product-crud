import { Component } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {

  showModal: boolean = false;
  errorMessage: string = 'Ha ocurrido un error, por favor recarga la pagina.';

  constructor(
    private errorHandlerService: ErrorHandlerService
  ){}

  ngOnInit(): void {
    this.errorHandlerService.errorNotifier.subscribe({
      next: (error) => {
        this.showModal = true;
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    console.log('close modal');
  }
}
