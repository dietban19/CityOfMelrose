import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMelrose } from './about-melrose';

describe('AboutMelrose', () => {
  let component: AboutMelrose;
  let fixture: ComponentFixture<AboutMelrose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMelrose],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMelrose);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
