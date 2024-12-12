import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from '../shared/components/banner-title/banner-title.component';
import { product } from './interfaces/product.interfaces';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-all-products',
  templateUrl: 'all-products.page.html',
  styleUrls: ['all-products.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FooterComponent,
    BannerTitleComponent,
    ProductCardComponent
  ],
})

export class AllProductsPage {

  data : product[] = [
    {
      id: 1,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-1.jpg',
      price: '1,500.00',
      discount:'10',
    },
    {
      id: 2,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-2.jpg',
      price: '1,500.00',
      discount:'5',
    },
    {
      id: 3,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-3.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      id: 4,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-4.jpg',
      price: '1,500.00',
      discount:'',
    },
    {
      id: 5,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-5.jpg',
      price: '1,500.00',
      discount:'',
    },
    {
      id: 6,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-6.jpg',
      price: '1,500.00',
      discount:'10',
    },
    {
      id: 7,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-7.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      id: 8,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-8.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      id: 9,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-9.jpg',
      price: '1,500.00',
      discount:'5',
    },
    {
      id: 10,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-10.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      id: 11,
      productName: 'Oficina Profesional',
      imgUrl: 'assets/images/product-11.jpg',
      price: '1,500.00',
      discount:'',
    },
  ];
  
  constructor() {}
}
