import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDrinkPage } from './add-drink.page';

const routes: Routes = [
  {
    path: '',
    component: AddDrinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDrinkPageRoutingModule {}
