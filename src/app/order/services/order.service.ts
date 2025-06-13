import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  private urlBackend: string = environment.apiUrl + '/orders';
  constructor(
    private router: Router,
  ) {
  }

  getAll(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBackend}/${id}`);
  }
}
