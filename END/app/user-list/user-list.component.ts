import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { XyzFilterByService } from '../shared/filter-by.service';
import { XyzUserListService } from './user-list.service';

@Component({
  selector: 'xyz-user-list',
  providers: [ XyzFilterByService, XyzUserListService ],
  templateUrl: 'app/user-list/user-list.component.html'
})
export class XyzUserListComponent implements OnInit {
  filter: string;
  users: User[];

  constructor(
    private xyzUserListService: XyzUserListService,
    private xyzFilterByService: XyzFilterByService
  ) { }

  ngOnInit() {
    this.xyzUserListService.get().then(users => this.users = users);
  }

  onFilter(filter) {
    this.filter = filter;
    let storageValue = JSON.stringify(filter);
    window.sessionStorage.setItem('filter', storageValue);
    this.xyzUserListService.get().then(users => {
      this.users = this.xyzFilterByService.get({ data: users, filter: filter });
    })
  }

  onClear() {
    this.xyzUserListService.get().then(users => this.users = users);
    this.filter = '';
  }
}
