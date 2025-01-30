import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from '../shared/components/banner-title/banner-title.component';
import { product } from './interfaces/product.interfaces';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { AllProductsService } from './services/all-products.service';

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

export class AllProductsPage implements OnInit{

  Data = <any>([]); 
  data : product[] = [];

  
    constructor(
      private AllProductsService: AllProductsService,
    ) {}
      
    ngOnInit(): void {
  
      this.loadData();
    }

    loadData() {
      this.AllProductsService.getAll().subscribe({
        next: (res: any) => {
          this.Data = res.data;

          this.data = this.Data.map((product: any) => ({
            id: product.id, 
            productName: product.nombre.trim(), 
            imgUrl: product.imagen, 
            price: parseFloat(product.precio).toFixed(2), 
            discount: product.discount, 
          }));

        },
        error: (error) => {
          console.error('Error fetching All Products:', error);
        }
      });
    }

  
}
