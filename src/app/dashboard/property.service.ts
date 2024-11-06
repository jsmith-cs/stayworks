import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PropertyService {
    private apiURL = 'http://stayworks.duckdns.org:3306/getProperties/';

    constructor(private http: HttpClient) {}

    getProperties() : Observable<any[]> {
        return this.http.get<any>(`${this.apiURL}`);
    }

    getProperty(id: number) : Observable<any> {
        return this.http.get<any>(`${this.apiURL}${id}`);
    }

    getAllProperties(): Observable<any[]> {
        return this.http.get<any[]>('http://stayworks.duckdns.org:3000/getProperties');
      }

}