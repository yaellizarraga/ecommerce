import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InfoTwoColumns } from '../../interfaces/info-two-columns.interface';

@Component({
  selector: 'app-shared-info-two-columns',
  templateUrl: 'info-two-columns.component.html',
  styleUrls: ['info-two-columns.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class InfoTwoColumnsComponent {
  
  items = input.required<InfoTwoColumns[]>();

  constructor() {}

}
