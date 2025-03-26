import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllToursComponent } from './all-tours.component';

describe('AllToursComponent', () => {
  let component: AllToursComponent;
  let fixture: ComponentFixture<AllToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllToursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
