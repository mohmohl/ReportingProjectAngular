import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfiuFileDownloadComponent } from './mfiu-file-download.component';

describe('MfiuFileDownloadComponent', () => {
  let component: MfiuFileDownloadComponent;
  let fixture: ComponentFixture<MfiuFileDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfiuFileDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfiuFileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
