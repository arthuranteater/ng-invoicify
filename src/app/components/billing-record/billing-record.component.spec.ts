import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingRecordComponent } from './billing-record.component';

describe('BillingRecordComponent', () => {
  let component: BillingRecordComponent;
  let fixture: ComponentFixture<BillingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
