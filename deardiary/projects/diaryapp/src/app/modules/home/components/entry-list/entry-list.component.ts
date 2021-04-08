import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  @Input()
  entries: any[] = [];

  constructor() { }

  displayedColumns: string[] = ['title', 'excerpt', 'dateCreated'];

  ngOnInit(): void {
  }

}
