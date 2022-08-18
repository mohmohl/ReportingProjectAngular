import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinkExportComponent } from './clink-export.component';

describe('ClinkExportComponent', () => {
  let component: ClinkExportComponent;
  let fixture: ComponentFixture<ClinkExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinkExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinkExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
