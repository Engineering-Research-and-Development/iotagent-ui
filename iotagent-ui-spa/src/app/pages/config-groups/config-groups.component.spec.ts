import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGroupsComponent } from './config-groups.component';

describe('ConfigGroupsComponent', () => {
  let component: ConfigGroupsComponent;
  let fixture: ComponentFixture<ConfigGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigGroupsComponent]
    });
    fixture = TestBed.createComponent(ConfigGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
