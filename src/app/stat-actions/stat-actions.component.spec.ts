import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatActionsComponent } from './stat-actions.component';

describe('StatActionsComponent', () => {
  let component: StatActionsComponent;
  let fixture: ComponentFixture<StatActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
