import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { InCreateDailyDiving } from '../../models/deepdive/request/InCreateDailyDiving';
import { DiveDayResponse } from '../../models/deepdive/response/DiveDayResponse';

@Injectable({
  providedIn: 'root'
})
export class DivedayService {
  private createDailyDivingURL = 'http://localhost:8080/dailyDiving';

  constructor(private http: HttpClient) { }

  //Este metodo con la idea de ejecutar periandicamente el script de python no sera necesario
  createDailyDiving(inCreateDailyDiving: InCreateDailyDiving): Observable<DiveDayResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.createDailyDivingURL, inCreateDailyDiving, { headers })
      .pipe(
        map((response: any) => {
          if (response.success) {
            console.log('Respuesta exitosa:', response.message);
            console.log('Respuesta exitosa data:', response.data);
            return response.data; // Devuelve solo los datos si la respuesta es exitosa
          } else {
            console.error('Respuesta de error:', response.error);
            throw new Error(response.error); // Lanza un error si la respuesta no es exitosa
          }
        }),
        catchError(this.handleError)
      );

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
