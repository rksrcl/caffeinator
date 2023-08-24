import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyProgressCheckPage } from './daily-progress-check.page';

const routes: Routes = [
  {
    path: '',
    component: DailyProgressCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyProgressCheckPageRoutingModule {}
