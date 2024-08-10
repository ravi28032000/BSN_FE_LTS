import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNumberUpdateComponent } from './mobile-number-update.component';

describe('MobileNumberUpdateComponent', () => {
  let component: MobileNumberUpdateComponent;
  let fixture: ComponentFixture<MobileNumberUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNumberUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNumberUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
