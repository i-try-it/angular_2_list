import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { XyzFilterByService } from '../shared/filter-by.service';
import { XyzRestRequestService } from '../shared/rest-request.servise';
import { XyzUserListService } from './user-list.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'xyz-user-list',
  providers: [XyzFilterByService, XyzUserListService, XyzRestRequestService],
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
  regions: string[];

  constructor(
    private xyzUserListService: XyzUserListService,
    private xyzFilterByService: XyzFilterByService,
    private xyzRestRequestService: XyzRestRequestService
  ) {
    this.storageKey = 'filter';
    this.subject = new Subject();
  }

  ngOnInit() { // will fire once on page load
    // updating the UI only after all our REST requests return data
    Observable.forkJoin(
      this.xyzRestRequestService.getSettings(),
      this.xyzRestRequestService.getLocations()
    ).subscribe(response => {
      let settings = response[0].json();
      let locations = response[1].json();

      this.regions = (locations.regions && locations.regions.length) ? locations.regions : [];
      this.revision = settings._rev;
      this.filter = (settings.filter && settings.filter.length) ? settings.filter : '';       

      this.xyzUserListService.get().then(users => {
        if (this.filter && this.filter.length) {
          this.users = this.xyzFilterByService.get({ data: users, filter: this.filter })
        } else {
          this.users = users;
        }
        return this.users;
      });

    })

    this.subject
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(response => {
        this.onFilter(response);
      });


  }

  onFilter(filter) {
    this.filter = filter;
    let filterParams = {};
    filterParams[this.storageKey] = this.filter;
    this.xyzRestRequestService.setSettings({
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
    this.xyzRestRequestService.setSettings({
      _rev: this.revision,
      filter: ''
    }).subscribe(response => {
      let settings = response.json();
      this.revision = settings.rev;
    })
  }
}
