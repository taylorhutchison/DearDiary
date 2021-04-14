import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StorageService } from 'projects/diaryapp/src/app/services/storage.service';
import { IndicatorFormComponent } from '../indicator-form/indicator-form.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelfieComponent } from '../selfie/selfie.component';
import { Chart, registerables } from 'chart.js';
import { createGuid } from 'projects/diaryapp/src/app/lib/utilities/guid';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {

  @ViewChildren(IndicatorFormComponent)
  indicatorForms: QueryList<IndicatorFormComponent> | undefined;

  @ViewChild('chart')
  chart: ElementRef<HTMLCanvasElement> | undefined;

  diaryForm: FormGroup | undefined;

  indicators: any[] = [];

  selfie: any;

  indicatorChart: Chart | undefined;

  private entry: any;

  constructor(private fb: FormBuilder,
    private storeService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const entryId = params.get('entryId');
      if (entryId == null || entryId == 'new') {
        this.diaryForm = this.fb.group({
          title: ['', Validators.required],
          notes: ['', Validators.required]
        });
      } else {
        this.entry = await this.storeService.getEntry(entryId);
        this.selfie = this.entry.selfie;
        this.indicators = this.entry.indicators;
        this.diaryForm = this.fb.group({
          title: this.entry.title,
          notes: this.entry.notes,
          selfie: this.entry.selfie
        });
        this.updateIndicatorChart();
      }
    });

  }

  private updateIndicatorChart() {
    if (this.indicatorChart) {
      this.indicatorChart.data.labels = [];
      (this.indicatorChart.data.datasets[0] as any).data = [];
      (this.indicatorChart.data.datasets[0] as any).backgroundColor = [];
      this.indicators.forEach((indicator, index) => {
        this.indicatorChart!.data!.labels!.push(indicator.name);
        (this.indicatorChart!.data.datasets[0] as any).data.push(indicator.value);
        (this.indicatorChart!.data.datasets[0] as any).backgroundColor.push(`hsla(${(index * 55) % 360}, 100%, 50%, 0.5)`);
      });
      this.indicatorChart.update();
    }
  }

  addIndicator() {
    this.indicators.push({});
  }

  updateIndicator() {
    const indicators = this.indicatorForms?.map(form => form.indicatorForm.value);
    if (indicators) {
      this.indicators = indicators;
      this.updateIndicatorChart();
      console.log(this.indicatorChart!.data);
    }
  }

  removeIndicator(indicator: any) {
    const index = this.indicators.findIndex((v) => v == indicator);
    this.indicators.splice(index, 1);
    this.updateIndicatorChart();
  }

  addSelfie() {
    const dialogRef = this.dialog.open(SelfieComponent, {
      height: '777px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selfie = result;
      }
    });
  }

  async save() {
    const guid = createGuid();
    const indicators = this.indicatorForms?.map(form => form.indicatorForm.value);
    const item = {
      entryId: this.entry ? this.entry.entryId : guid,
      dateCreated: this.entry ? this.entry.dateCreated : new Date(),
      ...this.diaryForm!.value,
      selfie: this.selfie,
      indicators: indicators
    };
    await this.storeService.addOrUpdateEntry(item);
    this.router.navigateByUrl('/home');
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
    var ctx = this.chart?.nativeElement!;
    this.indicatorChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: [],
        datasets: [{
          label: 'Indicators',
          data: [],
          backgroundColor: [
          ],
          borderColor: [
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          r: {
            max: 100,
            min: 0,
            ticks: {
              stepSize: 10
            }
          }
        }
      }
    });
    this.updateIndicatorChart();
  }

  fileChange(event: any) {
    var reader = new FileReader();
    reader.onload = (e: any) => {
      this.selfie = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

}
