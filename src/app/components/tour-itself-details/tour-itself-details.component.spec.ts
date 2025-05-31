import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourItselfDetailsComponent } from './tour-itself-details.component';

describe('TourItselfDetailsComponent', () => {
  let component: TourItselfDetailsComponent;
  let fixture: ComponentFixture<TourItselfDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourItselfDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourItselfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
