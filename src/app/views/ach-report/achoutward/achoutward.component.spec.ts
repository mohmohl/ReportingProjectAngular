import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchoutwardComponent } from './achoutward.component';

describe('AchoutwardComponent', () => {
  let component: AchoutwardComponent;
  let fixture: ComponentFixture<AchoutwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchoutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchoutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
