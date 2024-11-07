import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    MenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent { }
