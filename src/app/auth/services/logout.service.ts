import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private urlBackend: string = environment.apiUrl + '/logout';
  private http = inject(HttpClient);

  constructor() {}

  logout(token: string): Observable<any> {
    return this.http.get<any>(this.urlBackend, { headers: { Authorization: `Bearer ${token}` } });
  }

}
