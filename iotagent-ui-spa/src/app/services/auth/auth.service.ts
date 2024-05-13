import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(username: any, password: any) {
    const obj = { username, password };
    return this.httpClient.post(`${environment.API_BASE_URL}/basic/login`, obj);
  }
}
