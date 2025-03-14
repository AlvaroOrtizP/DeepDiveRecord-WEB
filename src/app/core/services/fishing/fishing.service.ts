import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { InCreateFishing } from '../../models/deepdive/request/InCreateFishing';
import { FishingResquest } from '../../models/deepdive/response/FishingResquest';
import { InEditFishing } from '../../models/deepdive/request/InEditFishing ';
import { InDeleteFishing } from '../../models/deepdive/request/InDeleteFishing';

@Injectable({
  providedIn: 'root'
})
export class FishingService {

  private fishingURL = 'http://localhost:8080/fishing';
  private fishingDeleteURL = 'http://localhost:8080/fishing/delete';

  constructor(private http: HttpClient) { }
  createFishing(inCreateFishing: InCreateFishing): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<number>(this.fishingURL, inCreateFishing, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  cargarDatosFishing(id: number): Observable<FishingResquest> {
    const url = `${this.fishingURL}/${id}`;
    return this.http.get<FishingResquest>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  editFishing(inEditFishing: InEditFishing): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Objeto enviado al servidor:", inEditFishing);

    return this.http.patch<any>(this.fishingURL, inEditFishing, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteFishing(inDeleteFishing: InDeleteFishing): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Objeto enviado al servidor (deleteFishing):", JSON.stringify(inDeleteFishing));
  
    return this.http.post<number>(this.fishingDeleteURL, inDeleteFishing, { headers })
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
