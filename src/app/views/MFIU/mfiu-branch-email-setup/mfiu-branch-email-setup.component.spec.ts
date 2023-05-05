import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfiuBranchEmailSetupComponent } from './mfiu-branch-email-setup.component';

describe('MfiuBranchEmailSetupComponent', () => {
  let component: MfiuBranchEmailSetupComponent;
  let fixture: ComponentFixture<MfiuBranchEmailSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfiuBranchEmailSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfiuBranchEmailSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
