import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingRecordFormComponent } from './billing-record-form.component';

describe('BillingRecordFormComponent', () => {
  let component: BillingRecordFormComponent;
  let fixture: ComponentFixture<BillingRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingRecordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
