import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewentriesComponent } from './newentries.component';

describe('NewentriesComponent', () => {
  let component: NewentriesComponent;
  let fixture: ComponentFixture<NewentriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewentriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewentriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
