import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-indicator-form',
  templateUrl: './indicator-form.component.html',
  styleUrls: ['./indicator-form.component.scss']
})
export class IndicatorFormComponent implements OnInit {

  indicatorForm!: FormGroup;

  @Input()
  indicator: any;

  @Output()
  removeIndicator = new EventEmitter<void>();

  @Output()
  updateIndicator = new EventEmitter<any>();

  get val() {
    return this.indicatorForm.get('value')?.value;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.indicator) {
      this.indicatorForm = this.fb.group({
        name: this.indicator.name,
        value: this.indicator.value
      });
    } else {
      this.indicatorForm = this.fb.group({
        name: '',
        value: 0
      });
    }
  }

  remove() {
    this.removeIndicator.emit();
  }

  update() {
    this.updateIndicator.emit();
  }

}
