import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../model/token';

@Injectable({ providedIn: 'root' })
export class BuyDashboardService {
  // recipeSelected = new EventEmitter<Recipe>();

  constructor(private http: HttpClient) {}

  getTokens(): Observable<Token[]> {
    return this.http.get<Token[]>('http://localhost:3000/getTokens');
    // .subscribe(data => {
    //   // this.totalAngularPackages = data.total;
    // });
  }

  login(username, password): Observable<Token[]> {
    return this.http.post<Token[]>('http://localhost:3000/login', {
      username: 'dominik@gmail.com',
      password: 'Hack1234!',
    });
    // .subscribe(data => {
    //   // this.totalAngularPackages = data.total;
    // });
  }
}
