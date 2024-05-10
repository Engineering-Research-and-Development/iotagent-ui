import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfigGroupComponent } from './add-config-group.component';

describe('AddConfigGroupComponent', () => {
  let component: AddConfigGroupComponent;
  let fixture: ComponentFixture<AddConfigGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConfigGroupComponent]
    });
    fixture = TestBed.createComponent(AddConfigGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
