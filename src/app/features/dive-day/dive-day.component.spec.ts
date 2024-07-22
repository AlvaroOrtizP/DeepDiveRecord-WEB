import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveDayComponent } from './dive-day.component';

describe('DiveDayComponent', () => {
  let component: DiveDayComponent;
  let fixture: ComponentFixture<DiveDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiveDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiveDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
