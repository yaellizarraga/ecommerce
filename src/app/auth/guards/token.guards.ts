import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})

export class TokenGuard implements CanActivate {
  
    private toastComponent = inject(ToastComponent);

    constructor(
        private router: Router,
        private TokenService: TokenService,
    ) {
      
    }

    async canActivate(): Promise<boolean> {
      const token = localStorage.getItem('token');
    
      if (!token) {
        this.redirect();
        return false;
      }
    
      try {
        const res: any = await this.TokenService.validateToken(token).toPromise();
        if (res.status) {
          return true;
        } else {
          this.redirect();
          return false;
        }
      } catch (error) {
        this.redirect();
        return false;
      }
    }
    

  async redirect(){
    this.router.navigate(['/login']); 
    this.toastComponent.showToast(
      'Sesión expirada! ', 
      'bottom', 
      'danger', 
      5000,
      true
    );
  }
}
