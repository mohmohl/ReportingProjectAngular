import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDenoRecordComponent } from './daily-deno-record.component';

describe('DailyDenoRecordComponent', () => {
  let component: DailyDenoRecordComponent;
  let fixture: ComponentFixture<DailyDenoRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyDenoRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDenoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
