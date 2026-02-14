import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoHeaderFooterLayout } from './no-header-footer-layout';

describe('NoHeaderFooterLayout', () => {
  let component: NoHeaderFooterLayout;
  let fixture: ComponentFixture<NoHeaderFooterLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoHeaderFooterLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoHeaderFooterLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
