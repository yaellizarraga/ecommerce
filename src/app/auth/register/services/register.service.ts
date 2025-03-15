import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

}
