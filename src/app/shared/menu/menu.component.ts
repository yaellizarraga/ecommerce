import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { MenuController } from '@ionic/angular';

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

  constructor(private menuCtrl: MenuController) {}

  closeMenu() {
    this.menuCtrl.close('mainMenu');
  }

}
