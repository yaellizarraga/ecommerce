import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { MenuController } from '@ionic/angular';
import { take } from 'rxjs';
import { LogoutService } from 'src/app/auth/services/logout.service';
import { TokenService } from 'src/app/auth/services/token.service';
import { environment } from 'src/environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent { 

  linkLogo = input<string>();
  token = false;
  UserData: any = {};
  urlFoto: any = 'assets/icons/avatar.svg';

  private readonly destroyRef1 = inject(DestroyRef);
  private readonly destroyRef2 = inject(DestroyRef);
  constructor(
    private menuCtrl: MenuController,
    private TokenService: TokenService,
    private LogoutService: LogoutService,
    private router:Router,
  ) {
    
    this.TokenService.getToken().pipe(takeUntilDestroyed(this.destroyRef1)).subscribe((token: boolean) => {
      this.token = token;
    });
    this.TokenService.getUserData().pipe(takeUntilDestroyed(this.destroyRef2)).subscribe(async(data: boolean) => {
      this.UserData = data;
      
      if (this.UserData?.Foto) {
        let res = await this.isValidUrl(this.UserData.Foto);

        if (res) {
          this.urlFoto = this.UserData.Foto;
        } else {
          this.urlFoto = environment.UrlImages + 'images/usuarios/' + this.UserData.Foto;
          console.log(this.urlFoto);
        }
      } else {
        this.urlFoto = 'assets/icons/avatar.svg';
      }
      

    });
  }

  isValidUrl(url: string | undefined): boolean {
    return !!url && (url.startsWith('http://') || url.startsWith('https://'));
  }

  closeMenu() {
    this.menuCtrl.close('mainMenu');
  }

  async logout(){
        this.closeMenu();
        
        const token = await localStorage.getItem('token') || '';
        
        this.LogoutService.logout(token).pipe(take(1)).subscribe({
          next: (res: any) => {
            localStorage.removeItem('userData');
            localStorage.removeItem('token');
            this.TokenService.setToken(false);
            this.TokenService.setUserData({});
            this.router.navigate(['login']);
          },
          error: (error: any) => {
            localStorage.removeItem('userData');
            localStorage.removeItem('token');
            this.TokenService.setToken(false);
            this.TokenService.setUserData({});
            this.router.navigate(['login']);
  
          }
        });
  
      }
}
