import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AddDrinkPage } from './add-drink.page';

describe('AddDrinkPage', () => {
  let component: AddDrinkPage;
  let fixture: ComponentFixture<AddDrinkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddDrinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
