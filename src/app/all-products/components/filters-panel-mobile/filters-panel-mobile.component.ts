import { Component, input, output } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { close, trashOutline, arrowBackOutline } from 'ionicons/icons';
import { Filters } from '../../interfaces/product.interfaces';
import { CommonModule } from '@angular/common';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-filters-panel-mobile',
  templateUrl: 'filters-panel-mobile.component.html',
  styleUrls: ['filters-panel-mobile.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
})

export class FiltersPanelMobileComponent {
  
  data = input<any>();
  AllFilters: Filters = {};

  constructor(
    private modalController: ModalController,
    private FiltersService: FiltersService,
  ) {
    addIcons({ close,trashOutline, arrowBackOutline });
    console.log(this.data());

    this.FiltersService.getFiltros().subscribe(value => {
      this.AllFilters = value;
    });

  }

  closeModal() {
      return this.modalController.dismiss();
  }

  addFilter(value: string, tipo: string) {
    this.FiltersService.addFilter(value, tipo);
  }

  get hasFilters(): boolean {
    return Object.keys(this.AllFilters).length > 0;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  
  deleteFilter(item: string, tipo: string) {
    this.FiltersService.deleteFilter(item, tipo);
  }

  deleteFilterAll(){
    this.FiltersService.deleteFilterAll();
  }
}

