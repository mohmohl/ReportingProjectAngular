import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfiuEmailTemplateComponent } from './mfiu-email-template.component';

describe('MfiuEmailTemplateComponent', () => {
  let component: MfiuEmailTemplateComponent;
  let fixture: ComponentFixture<MfiuEmailTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfiuEmailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfiuEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
