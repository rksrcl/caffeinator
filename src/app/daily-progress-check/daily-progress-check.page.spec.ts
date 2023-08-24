import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DailyProgressCheckPage } from './daily-progress-check.page';

describe('DailyProgressCheckPage', () => {
  let component: DailyProgressCheckPage;
  let fixture: ComponentFixture<DailyProgressCheckPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DailyProgressCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
