import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewentriesRoutingModule } from './entry-routing.module';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { IndicatorFormComponent } from './components/indicator-form/indicator-form.component';


@NgModule({
  declarations: [EntryFormComponent, IndicatorFormComponent],
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
export class EntryModule { }
