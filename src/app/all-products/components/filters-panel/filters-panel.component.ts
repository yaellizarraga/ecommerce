import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { close, trashOutline } from 'ionicons/icons';
import { Filters } from '../../interfaces/product.interfaces';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-filters-panel',
  templateUrl: 'filters-panel.component.html',
  styleUrls: ['filters-panel.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
})

export class FiltersPanelComponent {

  data = input<any>();
  AllFilters: Filters = {};

  constructor(private FiltersService: FiltersService) {
    addIcons({ close,trashOutline });
    
    this.FiltersService.getFiltros().subscribe(value => {
      this.AllFilters = value;
    });
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

