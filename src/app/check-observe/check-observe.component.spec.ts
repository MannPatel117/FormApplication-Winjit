import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckObserveComponent } from './check-observe.component';

describe('CheckObserveComponent', () => {
  let component: CheckObserveComponent;
  let fixture: ComponentFixture<CheckObserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckObserveComponent]
    });
    fixture = TestBed.createComponent(CheckObserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
