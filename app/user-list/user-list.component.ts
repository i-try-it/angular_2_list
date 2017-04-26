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
  storageKey: string;

  constructor(
    private xyzUserListService: XyzUserListService,
    private xyzFilterByService: XyzFilterByService
  ) {
    this.storageKey = 'filter';
  }

  ngOnInit() { // will fire once on page load
    let storageValue = window.sessionStorage.getItem(this.storageKey);
    this.filter = storageValue ? JSON.parse(storageValue) : '';
    this.xyzUserListService.get().then(users => {
      if(this.filter && this.filter.length) {
        this.users = this.xyzFilterByService.get({ data: users, filter: this.filter})
      } else {
        this.users = users;
      }
      return this.users;
    });
  }

  onFilter(filter) {
    this.filter = filter;
    let storageValue = JSON.stringify(filter);
    window.sessionStorage.setItem(this.storageKey, storageValue);
    this.xyzUserListService.get().then(users => {
      this.users = this.xyzFilterByService.get({ data: users, filter: filter });
    })
  }

  onClear() {
    window.sessionStorage.removeItem(this.storageKey);
    this.xyzUserListService.get().then(users => this.users = users);
    this.filter = '';
  }
}
