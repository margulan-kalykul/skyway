import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAndPurchaseComponent } from './about-and-purchase.component';

describe('AboutAndPurchaseComponent', () => {
  let component: AboutAndPurchaseComponent;
  let fixture: ComponentFixture<AboutAndPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutAndPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutAndPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
