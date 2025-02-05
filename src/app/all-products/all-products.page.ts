import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from '../shared/components/banner-title/banner-title.component';
import { product } from './interfaces/product.interfaces';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { AllProductsService } from './services/all-products.service';
import { environment } from '../../environments/environment';

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

export class AllProductsPage implements OnInit {
  data: product[] = [];
  displayedData: product[] = [];
  itemsPerPage = 20;
  currentPage = 1;
  isLastPage = false;

  constructor(private AllProductsService: AllProductsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(event?: any) {
    if (this.isLastPage) {
      if (event) event.target.complete();
      return;
    }

    this.AllProductsService.getAll(this.currentPage).subscribe({
      next: (res: any) => {
        const newProducts = res.data.map((product: any) => ({
          id: product.id,
          productName: product.nombre.trim(),
          imgUrl: environment.UrlImages + product.imagen,
          price: parseFloat(product.precio).toFixed(2),
          discount: product.discount,
        }));

        console.log(newProducts);
        this.displayedData = [...this.displayedData, ...newProducts];

        if (newProducts.length < this.itemsPerPage) {
          this.isLastPage = true;
        } else {
          this.currentPage++;
        }

        if (event) event.target.complete();
      },
      error: (error) => {
        console.error('Error fetching All Products:', error);
        if (event) event.target.complete();
      }
    });
  }
}

