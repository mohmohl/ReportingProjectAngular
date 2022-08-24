import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBranchSetupComponent } from './user-branch-setup.component';

describe('UserBranchSetupComponent', () => {
  let component: UserBranchSetupComponent;
  let fixture: ComponentFixture<UserBranchSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBranchSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBranchSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
