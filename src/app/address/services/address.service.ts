import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class addressService {
  private urlBackend: string = environment.apiUrl + '/address';
  private http = inject(HttpClient);
  private getListData = new BehaviorSubject<void>(undefined);
  constructor() { }
  
  getListData$ = this.getListData.asObservable();

  emitTrigger() {
    this.getListData.next();
  }

  getAddress(): Observable<any> {
    return this.getListData.asObservable();
  }

  setAddress(value: any): void {
    this.getListData.next(value);
  }
  
  getAll(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBackend}/${id}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBackend}/show/${id}`);
  }

  update(id: number, form: FormData): Observable<any> {
    return this.http.post<any>(`${this.urlBackend}/update/${id}`, form);
  }

  delete(id: number): Observable<any> {
    return this.http.post<any>(`${this.urlBackend}/destroy/${id}`,{});
  }

  create(id: number,form: FormData): Observable<any> {
    return this.http.post<any>(`${this.urlBackend}/store/${id}`, form);
  }

}
