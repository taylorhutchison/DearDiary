import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewentriesRoutingModule } from './newentries-routing.module';
import { NewentriesComponent } from './components/newentries/newentries.component';


@NgModule({
  declarations: [NewentriesComponent],
  imports: [
    CommonModule,
    NewentriesRoutingModule
  ]
})
export class NewentriesModule { }
