import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


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
  path: string;

  constructor(
    private router: Router,
    private activatedRote: ActivatedRoute,
    private xyzUserListService: XyzUserListService,
    private xyzFilterByService: XyzFilterByService
  ) {
    this.storageKey = 'filter';
    this.activatedRote.url.subscribe(url => this.path = url[0].path)
  }

  ngOnInit() { // will fire once on page load
    this.activatedRote.fragment.subscribe(fragment => {
      this.filter = (fragment) ? fragment : '';
    });
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
    let filterParams = {};
    filterParams[this.storageKey] = this.filter;
    this.router.navigate([ this.path ] , { fragment: this.filter }) // This second argument is called navigation extras, and allows for optional settings used during navigation
    this.xyzUserListService.get().then(users => {
      this.users = this.xyzFilterByService.get({ data: users, filter: filter });
    })
  }

  onClear() {
    this.router.navigate([ this.path ], { fragment: '' })
    this.xyzUserListService.get().then(users => this.users = users);
    this.filter = '';
  }
}
