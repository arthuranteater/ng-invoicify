import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormComponent } from './company-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('CompanyFormComponent', () => {
  let component: CompanyFormComponent;
  let fixture: ComponentFixture<CompanyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFormComponent, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
