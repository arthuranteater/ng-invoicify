import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DataService } from './data.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private dataService: DataService) {}

  login(user: object): Observable<any> {
    return this.dataService.editRecord('session', user).pipe(
      tap(
        (data) => {
          console.log('data from tap', data)
          localStorage.setItem('auth_user', JSON.stringify(data));
        },
        (err) => {
          console.error(`Login error`, err);
          throwError(err);
        }
      )
    )
  }

  logout() {
    return this.dataService.deleteRecord('session').pipe(
      tap(
        (data) => {
          localStorage.removeItem('auth_user');
        },
        (err) => {
          console.error(`Logout error`, err);
          throwError(err);
        }
      )
    );
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_user');
  }
}
