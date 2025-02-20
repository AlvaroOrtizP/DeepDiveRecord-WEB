import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishingEditFormComponent } from './fishing-edit-form.component';

describe('FishingEditFormComponent', () => {
  let component: FishingEditFormComponent;
  let fixture: ComponentFixture<FishingEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishingEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FishingEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
