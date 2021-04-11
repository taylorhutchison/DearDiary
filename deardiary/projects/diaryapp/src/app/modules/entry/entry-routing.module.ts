import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryFormComponent } from './components/entry-form/entry-form.component';

const routes: Routes = [
  { path: '', component: EntryFormComponent },
  { path: ':entryId', component: EntryFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewentriesRoutingModule { }
