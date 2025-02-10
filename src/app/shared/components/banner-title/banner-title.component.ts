import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ValidUrlPipe } from '../../pipes/validate-url.pipe';

@Component({
  selector: 'app-shared-banner-title',
  templateUrl: 'banner-title.component.html',
  styleUrls: ['banner-title.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ValidUrlPipe,
  ],
})
export class BannerTitleComponent {
  
  title = input('Titulo por default');
  backgroundUrl = input('');

  constructor() {}

}
