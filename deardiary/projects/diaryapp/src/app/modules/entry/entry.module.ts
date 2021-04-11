import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { IndicatorFormComponent } from './components/indicator-form/indicator-form.component';
import { SelfieComponent } from './components/selfie/selfie.component';


@NgModule({
  declarations: [EntryFormComponent, IndicatorFormComponent, SelfieComponent],
  imports: [
    CommonModule,
    EntryRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EntryModule { }
