import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InDeepDiveLogger } from '../models/deepdive/request/InDeepDiveLogger';
import { OutGetDataList } from '../models/deepdive/response/OutGetData';
import { InGetDataWeek } from '../models/deepdive/request/InGetDataWeek';

@Injectable({
  providedIn: 'root'
})
export class DeepdiveService {

  private getDataWeekUrl = 'http://localhost:8080/windwu/getDataWeek';
  //private getDataWeekUrl = 'http://api:8080/windwu/getDataWeek';


  constructor(private http: HttpClient) { }
  
  //Obtencion de los datos semanales de climatologia
  getDataWeek(inGetDataWeek: InGetDataWeek): Observable<OutGetDataList> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<OutGetDataList>(this.getDataWeekUrl, inGetDataWeek, { headers });
  }



  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg: string;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMsg);
    return throwError(() => new Error(errorMsg));
  }




}
