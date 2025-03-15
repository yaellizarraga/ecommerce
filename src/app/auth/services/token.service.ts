import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private http = inject(HttpClient);
  private token: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private UserData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private urlBackend: string = environment.apiUrl + '/token';
  constructor() {
  }

  async checkToken(): Promise<void> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.setToken(false);
      return;
    }

      this.validateToken(token).pipe(take(1)).subscribe({
        next: async(res: any) => {
          console.log(res);
          if(res.status){
            this.setToken(res.status);
          }else{
            this.setToken(false);
          }
        },
        error: (error: any) => {
          localStorage.clear();
          this.setToken(false);
        }
      });
  }

  validateToken(token: string): Observable<any> {
    return this.http.get<any>(this.urlBackend, { headers: { Authorization: `Bearer ${token}` } });
  }
  getToken(): Observable<any> {
    return this.token.asObservable();
  }

  setToken(value: boolean): void {
    this.token.next(value);
  }

}
