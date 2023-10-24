import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationModalComponent } from './delete-confirmation-modal.component';

describe('DeleteConfirmationModalComponent', () => {
  let component: DeleteConfirmationModalComponent;
  let fixture: ComponentFixture<DeleteConfirmationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationModalComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set showModal to false and emit onConfirm event', () => {
    component.showModal = true;
    const onConfirmSpy = spyOn(component.onConfirm, 'emit');
    component.confirm();
    expect(component.showModal).toBe(false);
    expect(onConfirmSpy).toHaveBeenCalled();
  });

  it('should set showModal to false and emit onCancel event', () => {
    component.showModal = true;
    const onCancelSpy = spyOn(component.onCancel, 'emit');
    component.cancel();
    expect(component.showModal).toBe(false);
    expect(onCancelSpy).toHaveBeenCalled();
  });
});
