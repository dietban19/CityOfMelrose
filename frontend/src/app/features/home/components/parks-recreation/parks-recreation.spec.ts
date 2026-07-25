import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParksRecreation } from './parks-recreation';

describe('ParksRecreation', () => {
  let component: ParksRecreation;
  let fixture: ComponentFixture<ParksRecreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParksRecreation],
    }).compileComponents();

    fixture = TestBed.createComponent(ParksRecreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
