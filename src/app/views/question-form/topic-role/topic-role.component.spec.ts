import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicRoleComponent } from './topic-role.component';

describe('TopicRoleComponent', () => {
  let component: TopicRoleComponent;
  let fixture: ComponentFixture<TopicRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
