import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEnterPageComponent } from './code-enter-page.component';

describe('CodeEnterPageComponent', () => {
  let component: CodeEnterPageComponent;
  let fixture: ComponentFixture<CodeEnterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeEnterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeEnterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
