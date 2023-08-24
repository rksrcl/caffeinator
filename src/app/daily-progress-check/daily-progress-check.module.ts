import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyProgressCheckPageRoutingModule } from './daily-progress-check-routing.module';
import { ProgressFormComponent } from '../progress-form/progress-form.component';

import { DailyProgressCheckPage } from './daily-progress-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DailyProgressCheckPageRoutingModule
  ],
  declarations: [DailyProgressCheckPage, ProgressFormComponent]
})
export class DailyProgressCheckPageModule {}
