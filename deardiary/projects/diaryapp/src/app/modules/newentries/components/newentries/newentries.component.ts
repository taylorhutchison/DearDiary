import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from 'projects/diaryapp/src/app/services/storage.service';
import { IndicatorFormComponent } from '../indicator-form/indicator-form.component';

@Component({
  selector: 'app-newentries',
  templateUrl: './newentries.component.html',
  styleUrls: ['./newentries.component.scss']
})
export class NewentriesComponent implements OnInit {

  @ViewChildren(IndicatorFormComponent)
  indicatorForms: QueryList<IndicatorFormComponent> | undefined;

  diaryForm: FormGroup | undefined;

  indicators: any[] = [];

  constructor(private fb: FormBuilder, private storeService: StorageService) { }

  ngOnInit(): void {
    this.diaryForm = this.fb.group({
      title: '',
      notes: ''
    });
  }

  addIndicator() {
    this.indicators.push({});
  }

  removeIndicator(indicator: any) {
    const index = this.indicators.findIndex((v) => v == indicator);
    this.indicators.splice(index, 1);
  }

  addSelfie() {

  }

  save() {
    const guid = this.storeService.generateEntryKey();
    const item = {
      entryId: guid,
      dateCreated: new Date(),
      ...this.diaryForm!.value
    };
    this.storeService.addItem(item);
    const x = this.indicatorForms?.map(form => form.indicatorForm.value);
    console.log(x);
  }

}
