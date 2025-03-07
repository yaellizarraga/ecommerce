import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { close, closeCircle, pin, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-filters-panel-mobile',
  templateUrl: 'filters-panel-mobile.component.html',
  styleUrls: ['filters-panel-mobile.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
  ],
})

export class FiltersPanelMobileComponent {

  constructor(private modalController: ModalController) {
    addIcons({ close, closeCircle, pin , arrowBackOutline });
  }

  closeModal() {
    this.modalController.dismiss();
  }

}

