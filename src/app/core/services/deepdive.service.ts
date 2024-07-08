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

  private runPythonScriptURL = 'http://localhost:8080/windwu/runPythonScript';
  private getDataWeekUrl = 'http://localhost:8080/windwu/getDataWeek';

  constructor(private http: HttpClient) { }
  
  //Este metodo con la idea de ejecutar periandicamente el script de python no sera necesario
  cargarDatos(inDeepDiveLogger: InDeepDiveLogger): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.runPythonScriptURL, inDeepDiveLogger, { headers })
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
