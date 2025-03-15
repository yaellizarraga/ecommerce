import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {


  private toastComponent = inject(ToastComponent);

  constructor(
    private router: Router,
    private TokenService: TokenService,
  ) {

  }

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      return true;
    }

    try {
      const res: any = await this.TokenService.validateToken(token).toPromise();
      if (res.status) {
        this.redirect();
        return false;
      } else {
        return true;
      }
    } catch (error) {
      this.router.navigate(['/all-products']);
      return false;
    }
  }


  async redirect() {
    this.router.navigate(['/all-products']);
    this.toastComponent.showToast(
      '¡No puedes iniciar sesión 2 veces! ',
      'bottom',
      'danger',
      5000,
      true
    );
  }
}
