import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { QandaPage } from './qanda.page';

describe('QandaPage', () => {
  let component: QandaPage;
  let fixture: ComponentFixture<QandaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
