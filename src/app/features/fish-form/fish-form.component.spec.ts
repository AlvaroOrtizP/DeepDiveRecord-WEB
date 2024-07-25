import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishFormComponent } from './fish-form.component';

describe('FishFormComponent', () => {
  let component: FishFormComponent;
  let fixture: ComponentFixture<FishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
