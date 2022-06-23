import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MMCBDataUploadComponent } from './mmcb-data-upload.component';

describe('MMCBDataUploadComponent', () => {
  let component: MMCBDataUploadComponent;
  let fixture: ComponentFixture<MMCBDataUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMCBDataUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMCBDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
