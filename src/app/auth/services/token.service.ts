import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private http = inject(HttpClient);
  private token: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private UserData: BehaviorSubject<{}> = new BehaviorSubject<{}>({});
  private urlBackend: string = environment.apiUrl + '/token';
  constructor(
    private router: Router,
  ) {
  }

  async checkToken(): Promise<void> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.setToken(false);
      return;
    }

    this.validateToken(token).pipe(take(1)).subscribe({
      next: async (res: any) => {
        if (res.status) {
          this.setToken(res.status);
          const userData = JSON.parse(localStorage.getItem('userData') || '{}') || {};
          this.setUserData(userData, true);
        } else {
          this.setToken(false);
        }
      },
      error: (error: any) => {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
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

  getUserData(): Observable<any> {
    return this.UserData.asObservable();
  }

  setUserData(value: any, original = false): void {

    if (Object.keys(value).length > 0 && !original) {

      const UserData = {
        Id: value?.Id_Persona,
        Nombre: value?.Nombre,
        ApellidoPaterno: value?.Apellido_Paterno,
        ApellidoMaterno: value?.Apellido_Materno,
        NombreCompleto: value?.Nombre + ' ' + value?.Apellido_Paterno + (value?.Apellido_Materno ? ' ' + value?.Apellido_Materno : ''),
        Foto: value?.Foto,
      };
      this.UserData.next(UserData);
      localStorage.setItem('userData', JSON.stringify(UserData));
    } else {
      this.UserData.next(value);
    }


  }

  async validateSesion(): Promise<boolean> {
    const token = await localStorage.getItem('token') || "";

    if (!token || token === "") {
      this.router.navigate(['/login']);
      return false; 
    }

    const res: any = await this.validateToken(token).toPromise();
    if (res.status === false) {
      this.router.navigate(['/login']);
      return false; 
    }

    return true; 
  }


}
