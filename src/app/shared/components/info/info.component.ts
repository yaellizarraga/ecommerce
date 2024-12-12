import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Info } from '../../interfaces/info.interface';

@Component({
  selector: 'app-shared-info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class InfoComponent {
  
  items = input.required<Info[]>();

  constructor() {
    effect(() => {
      console.log( this.items());
    });
  }

}
