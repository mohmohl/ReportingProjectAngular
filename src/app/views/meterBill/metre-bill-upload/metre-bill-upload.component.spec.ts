import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetreBillUploadComponent } from './metre-bill-upload.component';

describe('MetreBillUploadComponent', () => {
  let component: MetreBillUploadComponent;
  let fixture: ComponentFixture<MetreBillUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetreBillUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetreBillUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
