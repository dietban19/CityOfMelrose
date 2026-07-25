import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorProjects } from './major-projects';

describe('MajorProjects', () => {
  let component: MajorProjects;
  let fixture: ComponentFixture<MajorProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorProjects],
    }).compileComponents();

    fixture = TestBed.createComponent(MajorProjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
