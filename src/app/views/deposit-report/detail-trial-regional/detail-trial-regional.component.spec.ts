import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTrialRegionalComponent } from './detail-trial-regional.component';

describe('DetailTrialRegionalComponent', () => {
  let component: DetailTrialRegionalComponent;
  let fixture: ComponentFixture<DetailTrialRegionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTrialRegionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTrialRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
