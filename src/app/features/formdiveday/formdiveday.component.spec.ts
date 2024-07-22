import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiveDayComponent } from './formdiveday.component';

describe('FormdivedayComponent', () => {
  let component: FormDiveDayComponent;
  let fixture: ComponentFixture<FormDiveDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDiveDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDiveDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
