import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { InCreateFishing } from '../../models/deepdive/request/InCreateFishing';

@Injectable({
  providedIn: 'root'
})
export class FishingService {

  private createCreateFishingURL = 'http://localhost:8080/fishing';

  constructor(private http: HttpClient) { }
  createFishing(inCreateFishing: InCreateFishing): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<number>(this.createCreateFishingURL, inCreateFishing, { headers })
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
