import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortSearchComponent } from './short-search.component';

describe('ShortSearchComponent', () => {
  let component: ShortSearchComponent;
  let fixture: ComponentFixture<ShortSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
