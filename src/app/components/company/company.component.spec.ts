import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyComponent } from './company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 



describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyComponent, BrowserAnimationsModule  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
