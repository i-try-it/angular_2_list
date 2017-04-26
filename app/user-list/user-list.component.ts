import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Http } from '@angular/http';


import { XyzFilterByService } from '../shared/filter-by.service';
import { XyzUserListService } from './user-list.service';

import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/debounceTime';

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
  revision: string;
  settingsUrl: string;
  subject: Subject<string>;

  constructor(
    private http: Http,
    private xyzUserListService: XyzUserListService,
    private xyzFilterByService: XyzFilterByService
  ) {
    this.storageKey = 'filter';
    this.settingsUrl = 'http://localhost:5984/user/settings';
    this.subject = new Subject();
  }

  ngOnInit() { // will fire once on page load
    this.http.get(this.settingsUrl).subscribe( response => {
      let settings = response.json();
      this.revision = settings._rev;
      this.filter = (settings.filter && settings.filter.length) ? settings.filter : '';
      //new requests are only sends when typing stops
      //only last parameters will be used
      this.subject.debounceTime(500).subscribe(response => {
        this.onFilter(response);
      });

      this.xyzUserListService.get().then(users => {
        if(this.filter && this.filter.length) {
          this.users = this.xyzFilterByService.get({ data: users, filter: this.filter})
        } else {
          this.users = users;
        }
        return this.users;
      });
    })
  }

  onFilter(filter) {
    this.filter = filter;
    let filterParams = {};
    filterParams[this.storageKey] = this.filter;
    this.http.put(this.settingsUrl, {
      _rev: this.revision,
      filter: this.filter
    }).subscribe(response => {
      let settings = response.json();
      this.revision = settings.rev;
    })
    this.xyzUserListService.get().then(users => {
      this.users = this.xyzFilterByService.get({ data: users, filter: filter });
    })
  }

  onClear() {
    this.xyzUserListService.get().then(users => this.users = users);
    this.filter = '';
    this.http.put(this.settingsUrl, {
      _rev: this.revision,
      filter: ''
    }).subscribe(response => {
      let settings = response.json();
      this.revision = settings.rev;
    })
  }
}
