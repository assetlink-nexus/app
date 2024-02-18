import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderModalComponent } from './place-order-modal.component';

describe('PlaceOrderModalComponent', () => {
  let component: PlaceOrderModalComponent;
  let fixture: ComponentFixture<PlaceOrderModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceOrderModalComponent]
    });
    fixture = TestBed.createComponent(PlaceOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
