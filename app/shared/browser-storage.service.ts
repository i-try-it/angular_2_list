import { Injectable } from '@angular/core';

@Injectable()
export class XyzBrowserStorageService {
    private path: string;

    constructor() {  }

    getSession(key: string): string {
        let data = window.sessionStorage.getItem(key);
        return JSON.parse(data);
    }
    setSession(key: string, value: any) {
        let data = JSON.stringify(value);
        window.sessionStorage.setItem(key, data);
        return { key, value };
    }
    removeSession(key: string) {
        window.sessionStorage.removeItem(key);
        return key;
    }
    getLocal(key: string): string {
        let data = window.localStorage.getItem(key);
        return JSON.parse(data);
    }
    setLocal(key: string, value: any) {
        let data = JSON.stringify(value);
        window.localStorage.setItem(key, data);
        return { key, value };
    }
    removeLocal(key: string) {
        window.localStorage.removeItem(key);
        return key;
    }
}
