import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewentriesComponent } from './components/newentries/newentries.component';

const routes: Routes = [{ path: '', component: NewentriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewentriesRoutingModule { }
