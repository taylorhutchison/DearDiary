import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  @Input()
  entries: any[] = [];

  constructor(private router: Router) { }

  displayedColumns: string[] = ['title', 'excerpt', 'dateCreated', 'edit'];

  ngOnInit(): void {
  }

  edit(entry: any) {
    console.log(entry.entryId);
    this.router.navigateByUrl('/entry/' + entry.entryId);
  }

}
