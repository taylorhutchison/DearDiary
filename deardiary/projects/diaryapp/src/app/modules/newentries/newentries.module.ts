import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewentriesRoutingModule } from './newentries-routing.module';
import { NewentriesComponent } from './components/newentries/newentries.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { IndicatorFormComponent } from './components/indicator-form/indicator-form.component';


@NgModule({
  declarations: [NewentriesComponent, IndicatorFormComponent],
  imports: [
    CommonModule,
    NewentriesRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewentriesModule { }
