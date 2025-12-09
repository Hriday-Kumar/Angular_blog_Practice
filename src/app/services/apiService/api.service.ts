import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL: string = '';
  private http = inject(HttpClient);
  constructor() {
    this.BASE_URL = '';
  }
  setBaseUrl(url: string) {
    this.BASE_URL = url;
  }
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}/${endpoint}`).pipe(catchError(this.handleError));
  }
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.BASE_URL}/${endpoint}`, body).pipe(catchError(this.handleError));
  }
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}/${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.BASE_URL}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => error);
  }

}
