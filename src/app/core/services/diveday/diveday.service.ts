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
  // Método para crear un nuevo diveDay
  createDailyDiving(inCreateDailyDiving: InCreateDailyDiving): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<number>(this.createDailyDivingURL, inCreateDailyDiving, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  // Método para obtener un diveDay por ID
  cargarDatosDiveDay(id: number): Observable<DiveDayResponse> {
    const url = `${this.createDailyDivingURL}/${id}`;
    return this.http.get<DiveDayResponse>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg: string;

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMsg);
    return throwError(() => new Error(errorMsg));
  }




}
