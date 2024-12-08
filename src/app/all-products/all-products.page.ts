import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../shared/header/header.component";
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
    HeaderComponent,
    FooterComponent,
    BannerTitleComponent,
    ProductCardComponent
  ],
})

export class AllProductsPage {

  data : product[] = [
    {
      productName: 'Tenis adidas VL Court 3.0',
      imgUrl: 'https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/default/1031557-0100V1.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      productName: 'Tenis adidas VL Court 3.0',
      imgUrl: 'https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/default/1031557-0100V1.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      productName: 'Tenis adidas VL Court 3.0',
      imgUrl: 'https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/default/1031557-0100V1.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      productName: 'Tenis adidas VL Court 3.0',
      imgUrl: 'https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/default/1031557-0100V1.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      productName: 'Tenis adidas VL Court 3.0',
      imgUrl: 'https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/default/1031557-0100V1.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      productName: 'Tenis adidas VL Court 3.0',
      imgUrl: 'https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/default/1031557-0100V1.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      productName: 'Tenis adidas VL Court 3.0',
      imgUrl: 'https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/default/1031557-0100V1.jpg',
      price: '1,500.00',
      discount:'20',
    },
    {
      productName: 'Tenis adidas VL Court 3.0',
      imgUrl: 'https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/default/1031557-0100V1.jpg',
      price: '1,500.00',
      discount:'20',
    },
  ];
  
  constructor() {}
}
