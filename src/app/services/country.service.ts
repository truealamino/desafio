import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    api: any = environment.api

    constructor(private http: HttpClient) { }

    list(type: number = 0, term: string = ''): Observable<any> {
        let data: any = {
            'typeSearch': type,
            'term': term
        }

        return this.http.get<any>(`${this.api.desafio_rest}countries`, { params: data }).pipe(map((response) => response));
    }

    show(code): Observable<any> {
        return this.http.get(`${this.api.desafio_rest}countries/${code}`).pipe(map(response => response));
    }

    getBorders(borders): Observable<any> {
        let data: any = {
            'borders': borders
        }

        return this.http.get(`${this.api.desafio_rest}get-borders`, { params: data }).pipe(map(response => response));
    }

    listCountriesByRegion(region): Observable<any> {
        let data: any = {
            'region': region
        }
        return this.http.get(`${this.api.desafio_rest}country-region`, { params: data }).pipe(map(response => response));
    }
}
