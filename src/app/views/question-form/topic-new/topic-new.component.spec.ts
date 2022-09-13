import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicNewComponent } from './topic-new.component';

describe('TopicNewComponent', () => {
  let component: TopicNewComponent;
  let fixture: ComponentFixture<TopicNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
