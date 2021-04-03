import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private fb: FormBuilder) { }

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

  save() {
    console.log(this.diaryForm!.value);
    const x = this.indicatorForms?.map(form => form.indicatorForm.value);
    console.log(x);
  }

}
