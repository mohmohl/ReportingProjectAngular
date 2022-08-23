import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoAssetsComponent } from './conso-assets.component';

describe('ConsoAssetsComponent', () => {
  let component: ConsoAssetsComponent;
  let fixture: ComponentFixture<ConsoAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
