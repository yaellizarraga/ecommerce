import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private urlBackend: string = environment.apiUrl + '/theme';
  private http = inject(HttpClient);

  constructor() {}

  create(form: object): Observable<any> {
    return this.http.post<any>(this.urlBackend, form);
  }

  getAll(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.urlBackend}?page=${page}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBackend}/${id}`);
  }

  update(id: number, form: object): Observable<any> {
    return this.http.put<any>(`${this.urlBackend}/${id}`, form);
  }

  delete(): Observable<any> {
    return this.http.delete<any>(this.urlBackend);
  }
}
