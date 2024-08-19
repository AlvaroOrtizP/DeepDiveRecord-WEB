import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveDayListComponent } from './dive-day-list.component';

describe('DiveDayListComponent', () => {
  let component: DiveDayListComponent;
  let fixture: ComponentFixture<DiveDayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiveDayListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiveDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
