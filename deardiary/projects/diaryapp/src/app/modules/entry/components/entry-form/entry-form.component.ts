import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StorageService } from 'projects/diaryapp/src/app/services/storage.service';
import { IndicatorFormComponent } from '../indicator-form/indicator-form.component';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {

  @ViewChildren(IndicatorFormComponent)
  indicatorForms: QueryList<IndicatorFormComponent> | undefined;

  diaryForm: FormGroup | undefined;

  indicators: any[] = [];

  private entry: any;

  constructor(private fb: FormBuilder, private storeService: StorageService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const entryId = params.get('entryId');
      if (entryId == null || entryId == 'new') {
        this.diaryForm = this.fb.group({
          title: '',
          notes: ''
        });
      } else {
        this.entry = await this.storeService.getItem(entryId);
        this.diaryForm = this.fb.group({
          title: this.entry.title,
          notes: this.entry.notes
        });
      }
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

  async save() {
    const guid = this.storeService.generateEntryKey();
    const indicators = this.indicatorForms?.map(form => form.indicatorForm.value);
    const item = {
      entryId: this.entry ? this.entry.entryId : guid,
      dateCreated: this.entry ? this.entry.dateCreated : new Date(),
      ...this.diaryForm!.value,
      indicators
    };
    await this.storeService.addOrUpdateItem(item);
    this.router.navigateByUrl('/home');
  }

}
