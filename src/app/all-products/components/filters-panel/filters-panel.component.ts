import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { close, closeCircle, pin } from 'ionicons/icons';

@Component({
  selector: 'app-filters-panel',
  templateUrl: 'filters-panel.component.html',
  styleUrls: ['filters-panel.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
  ],
})

export class FiltersPanelComponent {

  constructor() {
    addIcons({ close, closeCircle, pin });
  }

}

