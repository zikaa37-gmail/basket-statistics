import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersPopupComponent } from './players-popup.component';

describe('PlayersPopupComponent', () => {
  let component: PlayersPopupComponent;
  let fixture: ComponentFixture<PlayersPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
