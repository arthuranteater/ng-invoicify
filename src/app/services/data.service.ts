import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  //error handler
  private handleError(error: HttpErrorResponse) {
    let message: string = 'error';
    if (error.status === 0) {
      console.error(`A client-side or network error occurred: ${error.error}`);
      message = `A client-side or network error occurred: ${error.error}`;
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      message = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    return throwError(message);
  }

  //requests
  getRecords(endpoint: string): Observable<object> {
    let apiUrl = this.baseUrl + endpoint;
    return this.http.get(apiUrl, { withCredentials: true }).pipe(
      tap(
        (data) => {
          console.log(`Data from ${endpoint}}`, data);
        },
        (err) => {
          console.log(`Error from ${endpoint}`, err);
          throwError(err);
        },
        () => console.log('completed')
      ),
      catchError(this.handleError)
    );
  };

  getRecord(endpoint: string, id: number): Observable<object> {
    let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
    return this.http.get(apiUrl, { withCredentials: true }).pipe(
      tap(
        (data) => {
          console.log(`Data from ${endpoint}}`, data);
        },
        (err) => {
          console.log(`Error from ${endpoint}`, err);
          throwError(err);
        },
        () => console.log('completed')
      ),
      catchError(this.handleError)
    );
  };

  deleteRecord(endpoint: string, id?: number): Observable<object> {
    let apiUrl = `${this.baseUrl}${endpoint}`;
    apiUrl = id ? apiUrl + '/' + id : apiUrl;
    return this.http.delete(apiUrl, { withCredentials: true }).pipe(
      tap(
        (data) => {
          console.log(`Data from ${endpoint}}`, data);
        },
        (err) => {
          console.log(`Error from ${endpoint}`, err);
          throwError(err);
        },
        () => console.log('completed')
      ),
      catchError(this.handleError)
    );
  };

  editRecord(
    endpoint: string,
    record: object,
    id?: number
  ): Observable<object> {
    let apiUrl = `${this.baseUrl}${endpoint}`;
    apiUrl = id ? apiUrl + '/' + id : apiUrl;
    return this.http
      .put(apiUrl, record, { withCredentials: true, responseType: 'json' })
      .pipe(
        tap(
          (data) => {
            console.log(`Data from ${endpoint}}`, data);
          },
          (err) => {
            console.log(`Error from ${endpoint}`, err);
            throwError(err);
          },
          () => console.log('completed')
        ),
        catchError(this.handleError)
      );
  };

  addRecord(endpoint: string, record: object): Observable<object> {
    let apiUrl = `${this.baseUrl}${endpoint}`;
    return this.http.post(apiUrl, record, { withCredentials: true, responseType: 'json' }).pipe(
      tap(
        (data) => {
          console.log(`Data from ${endpoint}}`, data);
        },
        (err) => {
          console.log(`Error from ${endpoint}`, err);
          throwError(err);
        },
        () => console.log('completed')
      ),
      catchError(this.handleError)
    );
  };
};
