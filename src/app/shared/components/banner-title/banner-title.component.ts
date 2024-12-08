import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-shared-banner-title',
  templateUrl: 'banner-title.component.html',
  styleUrls: ['banner-title.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class BannerTitleComponent {
  
  title = input('Titulo por default');
  backgroundUrl = input('https://www.sinembargo.mx/wp-content/uploads/2018/04/renta.jpg');

  constructor() {}

}
