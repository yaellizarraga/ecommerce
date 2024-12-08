import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { product } from 'src/app/all-products/interfaces/product.interfaces';

@Component({
  selector: 'app-shared-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class ProductCardComponent {
  
  item = input.required<product>();

  constructor() {}


}
