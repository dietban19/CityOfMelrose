import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recreation } from './recreation';

describe('Recreation', () => {
  let component: Recreation;
  let fixture: ComponentFixture<Recreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recreation],
    }).compileComponents();

    fixture = TestBed.createComponent(Recreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
