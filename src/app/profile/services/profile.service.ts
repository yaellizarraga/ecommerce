import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private urlBackend: string = environment.apiUrl + '/profile';
  private urlResetPassword: string = this.urlBackend + '/reset-password';
  private urlTaxData: string = this.urlBackend + '/tax-data';
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
  
  updateProfile(form: FormData,id: number): Observable<any> {
    return this.http.post<any>(`${this.urlBackend}/${id}`, form);
  }

  updateResetPassword(form: object,id: number): Observable<any> {
    return this.http.post<any>(`${this.urlResetPassword}/${id}`, form);
  }

  updateTaxData(form: FormData,id: number): Observable<any> {
    return this.http.post<any>(`${this.urlTaxData}/${id}`, form);
  }
}
