import { Injectable } from '@angular/core';
import { FishResponse } from '../../models/deepdive/response/FishResponse';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FishService {

  private getAllFishListUrl = 'http://localhost:8080/fish';

  constructor(private http: HttpClient) { }
  getAllFishList(): Observable<FishResponse[]> {
    return this.http.get<FishResponse[]>(this.getAllFishListUrl)
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
