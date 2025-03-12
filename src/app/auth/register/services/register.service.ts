import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private urlBackend: string = environment.apiUrl + '/register';
  private http = inject(HttpClient);

  constructor() {}

  create(form: object): Observable<any> {
    return this.http.post<any>(this.urlBackend, form);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.urlBackend);
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
