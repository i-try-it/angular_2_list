import { Injectable } from '@angular/core'
import { Http, Jsonp } from '@angular/http';


@Injectable()
export class XyzRestRequestService {
    settingsUrl: string;
    locationsUrl: string;
    constructor(
        private http: Http,
        private jsonp: Jsonp
    ) {
        this.settingsUrl = 'http://localhost:5984/user/settings';
        this.locationsUrl = 'http://localhost:5984/user/locations';
    }

    getSettings(){
        return this.jsonp.get(`${this.settingsUrl}?callback=JSONP_CALLBACK`)
    }

    getLocations(){
        return this.http.get(this.locationsUrl)
    }

    setSettings(payload: Object){
        return this.http.put(this.settingsUrl, payload)
    }
}