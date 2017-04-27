import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class XyzUrlService {
    private path: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    )
     { 
         this.activatedRoute.url.subscribe(url => this.path =url[0].path);
     }

    get(type: string): Observable<string> {
        return this.activatedRoute[type];
    }
    set(type: string, value: any):Promise<boolean> {
        if('params' === type) {
            return this.router.navigate([this.path, value]);
        }
        if('queryParams' === type) {
            return this.router.navigate([this.path], { queryParams: value })
        }
        if('fragment' === type) {
            return this.router.navigate([this.path], {fragment: value});
        }
        return
    }
}
