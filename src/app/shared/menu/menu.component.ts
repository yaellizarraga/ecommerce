import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent { }
