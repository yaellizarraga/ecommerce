import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from '../menu/menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    RouterModule,
    MenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent { }
