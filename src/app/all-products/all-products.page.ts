import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from '../shared/components/banner-title/banner-title.component';
import { product } from './interfaces/product.interfaces';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { ProductService } from './services/product.service';
import { environment } from '../../environments/environment';
import { HeaderService } from '../shared/header/services/header.service';
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

export class AllProductsPage implements OnInit {
  data: product[] = [];
  displayedData: product[] = [];
  link_logo: string = '';
  backgroudUrl: string = '';
  itemsPerPage = 20;
  currentPage = 1;
  isLastPage = false;

  constructor(
    private ProductService: ProductService,
    private AllProductsService: AllProductsService,
    private HeaderService: HeaderService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadHeader();
    this.loadBanner();
  }

  loadHeader() {
    this.HeaderService.getAll().subscribe({
      next: (res: any) => {
        this.link_logo = (res.data.length > 0) ? res.data[0].link_logo :'';

      },
      error: (error) => {
        console.error('Error fetching Header:', error);
      }
    });
  }

  loadBanner() {
    this.AllProductsService.getAll().subscribe({
      next: (res: any) => {
        this.backgroudUrl = (res.data.length > 0) ? res.data[0].link_banner :'';

      },
      error: (error) => {
        console.error('Error fetching Header:', error);
      }
    });
  }

  loadData(event?: any) {
    if (this.isLastPage) {
      if (event) event.target.complete();
      return;
    }

    this.ProductService.getAll(this.currentPage).subscribe({
      next: (res: any) => {
        const newProducts = res.data.map((product: any) => ({
          id: product.id,
          productName: product.nombre.trim(),
          description: product.descripcion,
          imgUrl: environment.UrlImages + product.imagen,
          images: product.imagenes.map((img: string) => environment.UrlImages + img),
          price: parseFloat(product.precio).toFixed(2),
          discount: product.discount,
        }));

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

