import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishFactsComponent } from './fish-facts.component';

describe('FishFactsComponent', () => {
  let component: FishFactsComponent;
  let fixture: ComponentFixture<FishFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishFactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FishFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
