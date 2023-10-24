import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorModalComponent } from './error-modal.component';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorModalComponent],
      providers: [ErrorHandlerService]
    });
    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('coseModal() test', () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBeFalsy();
  });

});
