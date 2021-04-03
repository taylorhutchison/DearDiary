import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-indicator-form',
  templateUrl: './indicator-form.component.html',
  styleUrls: ['./indicator-form.component.scss']
})
export class IndicatorFormComponent implements OnInit {

  indicatorForm!: FormGroup;

  @Output()
  removeIndicator = new EventEmitter<void>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.indicatorForm = this.fb.group({
      name: '',
      value: 0
    });
  }

  remove() {
    this.removeIndicator.emit();
  }

}
