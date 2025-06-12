import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private urlBackend: string = environment.apiUrl + '/envios/metodo-pago';
  private http = inject(HttpClient);

  constructor() {}

  create(form: object, id:number): Observable<any> {
    return this.http.post<any>(`${this.urlBackend}/${id}`, form);
  }

}
