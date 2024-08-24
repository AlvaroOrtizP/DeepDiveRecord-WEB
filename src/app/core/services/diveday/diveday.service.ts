import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { InCreateDailyDiving } from '../../models/deepdive/request/InCreateDailyDiving';
import { DiveDayDetailsResponse } from '../../models/deepdive/response/DiveDayDetailsResponse';
import { Page } from '../../models/deepdive/response/Page';
import { DiveDayResponse } from '../../models/deepdive/response/DiveDayResponse';

@Injectable({
  providedIn: 'root'
})
export class DivedayService {
  private dailyDivingURL = 'http://localhost:8080/dailyDiving';
  private dailyDivingListURL = 'http://localhost:8080/dailyDiving/list';

  constructor(private http: HttpClient) { }

  //Este metodo con la idea de ejecutar periandicamente el script de python no sera necesario
  // Método para crear un nuevo diveDay
  createDailyDiving(inCreateDailyDiving: InCreateDailyDiving): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<number>(this.dailyDivingURL, inCreateDailyDiving, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  // Método para obtener un diveDay por ID
  cargarDatosDiveDay(id: number): Observable<DiveDayDetailsResponse> {
    const url = `${this.dailyDivingURL}/${id}`;
    return this.http.get<DiveDayDetailsResponse>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para obtener una lista paginada de días de buceo
  getFishingDays(page: number = 0, size: number = 10, zona?: string, sortBy: string = 'fecha', sortDirection: string = 'asc'): Observable<Page<DiveDayResponse>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    if (zona) {
      params = params.set('zona', zona);
    }

    return this.http.get<Page<DiveDayResponse>>(this.dailyDivingListURL, { params }).pipe(
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
