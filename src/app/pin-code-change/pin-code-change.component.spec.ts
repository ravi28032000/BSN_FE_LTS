import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCodeChangeComponent } from './pin-code-change.component';

describe('PinCodeChangeComponent', () => {
  let component: PinCodeChangeComponent;
  let fixture: ComponentFixture<PinCodeChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinCodeChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCodeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
