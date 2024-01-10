import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalInputComponent } from './global-input.component';

describe('GlobalInputComponent', () => {
  let component: GlobalInputComponent;
  let fixture: ComponentFixture<GlobalInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalInputComponent]
    });
    fixture = TestBed.createComponent(GlobalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
