import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTxResultComponent } from '../pay-tx-result/pay-tx-result.component';

describe('PayTxResultComponent', () => {
  let component: PayTxResultComponent;
  let fixture: ComponentFixture<PayTxResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayTxResultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTxResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
