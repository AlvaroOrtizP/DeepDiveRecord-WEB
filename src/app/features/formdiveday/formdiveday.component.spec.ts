import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdivedayComponent } from './formdiveday.component';

describe('FormdivedayComponent', () => {
  let component: FormdivedayComponent;
  let fixture: ComponentFixture<FormdivedayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormdivedayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormdivedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
