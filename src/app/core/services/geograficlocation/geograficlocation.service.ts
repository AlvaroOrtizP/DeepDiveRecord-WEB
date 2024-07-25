import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GeograficLocationResponse } from '../../models/deepdive/response/GeograficLocationResponse';

@Injectable({
  providedIn: 'root'
})
export class GeograficlocationService {
  private getGeograficLocationListURL = 'http://localhost:8080/GeographicalLocation';

  constructor(private http: HttpClient) { }
  getGeograficLocationList(): Observable<GeograficLocationResponse[]> {
    return this.http.get<GeograficLocationResponse[]>(this.getGeograficLocationListURL)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg: string;

    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMsg);
    return throwError(() => new Error(errorMsg));
  }
}