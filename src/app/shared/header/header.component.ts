import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from '../menu/menu.component';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from './services/header.service';
import { ValidUrlPipe } from '../pipes/validate-url.pipe';
import { addIcons } from 'ionicons';
import { cartOutline, logInOutline, logOutOutline } from 'ionicons/icons';
import { TokenService } from 'src/app/auth/services/token.service';
import { LogoutService } from 'src/app/auth/services/logout.service';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    MenuComponent,
    ValidUrlPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  Data = <any>([]);

  isOpen = false;
  isOpenLogout = false;

  token = false;
  UserData: any = {};
  urlFoto: any = 'assets/icons/avatar.svg';

  @ViewChild('login') popover!: HTMLIonPopoverElement;
  @ViewChild('logoutPopover') popoverLogout!: HTMLIonPopoverElement;

  constructor(
    private HeaderService: HeaderService,
    private TokenService: TokenService,
    private LogoutService: LogoutService,
    private router: Router,
  ) {
    addIcons({ cartOutline, logInOutline, logOutOutline });

    this.TokenService.getToken().subscribe((token: boolean) => {
      this.token = token;
    });
    this.TokenService.getUserData().subscribe(async (data: boolean) => {
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

  ngOnInit(): void {

    this.loadData();
  }
  loadData() {
    this.HeaderService.getAll().subscribe({
      next: (res: any) => {
        this.Data = res.data[0];

      },
      error: (error) => {
        console.error('Error fetching Header:', error);
      }
    });
  }

  openPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  closePopover() {
    this.isOpen = false;
  }
  openPopoverLogout(e: Event) {
    this.popoverLogout.event = e;
    this.isOpenLogout = true;
  }

  closePopoverLogout() {
    this.isOpenLogout = false;
  }

  async logout() {
    this.closePopoverLogout();

    const token = await localStorage.getItem('token') || '';

    this.LogoutService.logout(token).pipe(take(1)).subscribe({
      next: (res: any) => {
        localStorage.clear();
        this.TokenService.setToken(false);
        this.TokenService.setUserData({});
        this.router.navigate(['login']);
      },
      error: (error: any) => {
        localStorage.clear();
        this.TokenService.setToken(false);
        this.router.navigate(['login']);

      }
    });

  }

}
