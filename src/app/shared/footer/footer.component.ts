import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent { }
