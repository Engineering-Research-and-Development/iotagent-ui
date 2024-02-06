import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAgentComponent } from './detail-agent.component';

describe('DetailAgentComponent', () => {
  let component: DetailAgentComponent;
  let fixture: ComponentFixture<DetailAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAgentComponent]
    });
    fixture = TestBed.createComponent(DetailAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
