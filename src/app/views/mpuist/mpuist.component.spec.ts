import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpuistComponent } from './mpuist.component';

describe('MpuistComponent', () => {
  let component: MpuistComponent;
  let fixture: ComponentFixture<MpuistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpuistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpuistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
