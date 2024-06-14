import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InDeepDiveLogger } from '../models/deepdive/request/InDeepDiveLogger';

@Injectable({
  providedIn: 'root'
})
export class DeepdiveService {

  private apiUrl = 'http://localhost:8080/windwu/runPythonScript';

  constructor(private http: HttpClient) { }

  cargarDatos(inDeepDiveLogger: InDeepDiveLogger): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl, inDeepDiveLogger, { headers })
      .pipe(
        map((response: any) => {
          if (response.success) {
            console.log('Respuesta exitosa:', response.message);
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
