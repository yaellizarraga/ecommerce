import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef, Input, input, inject, DestroyRef, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { product } from 'src/app/all-products/interfaces/product.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductService } from 'src/app/all-products/services/product.service';
import { environment } from 'src/environments/environment';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Info } from '../../interfaces/info.interface';
import { InfoComponent } from '../info/info.component';
import { take } from 'rxjs';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: 'app-shared-carrusel',
  templateUrl: 'carrusel.component.html',
  styleUrls: ['carrusel.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    ProductCardComponent,
    InfoComponent,
    SpinnerComponent
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarruselComponent implements AfterViewInit {

  data: product[] = [];
  displayedData: product[] = [];
  loadingButton = false;
  filters = '';
  loading = true;
  sinData = false;
  itemsPerPage = 20;
  currentPage = 1;
  isLastPage = false;
  link_logo: string = '';
  private readonly destroyRef1 = inject(DestroyRef);
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  title: Info[] = [
    {
      title: "<h1><strong>Sugeridos</strong></h1>",
      description: '',
      colorBackground: 'transparent',
    },
  ];

  constructor(
    private router: Router,
    private ProductService: ProductService,
  ) {
  }

  ngAfterViewInit() {

    const swiperEl = this.swiperContainer.nativeElement;

    const swiperParams = {
      slidesPerView: 5,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      zoom: {
        maxRatio: 5,
      },
      pagination: true,
      navigation: true,
      breakpoints: {
        0: {
          slidesPerView: 1, // celulares
        },
        768: {
          slidesPerView: 2, // tablets
        },
        1024: {
          slidesPerView: 3, // tablets grandes
        },
        1280: {
          slidesPerView: 5, // laptops y pantallas grandes
        }
      },
      on: {
        reachEnd: () => {
          this.loadData(true); // Cargar más productos al llegar al final
        }
      }
    };

    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();
  }

  async loadData(reload: boolean = false) {

    if (reload){
      this.currentPage = this.currentPage + 1;
      this.filters = `?page=${this.currentPage}&Sugerido=1`;
    } else {
      this.filters = `?page=${this.currentPage}&Sugerido=1`;
    }

    this.ProductService.getAll(this.filters).pipe(
      take(1), takeUntilDestroyed(this.destroyRef1)).subscribe({
        next: (res: any) => {
          this.loading = false;

          const newProducts = res.data.map((product: any) => ({
            id: product.id,
            productName: product.nombre.trim(),
            description: product.descripcion,
            imgUrl: environment.UrlImages + product.imagen,
            images: product.imagenes.map((img: string) => environment.UrlImages + img),
            price: product.precio,
            discount: product.precio_oferta,
            detalles: product.Detalles_Producto,
            familia: product.familia,
            categoria: product.categoria,
            modelo: product.modelo,
            marca: product.marca,
            color: product.color,
            medida: product.medida,
          }));

          this.displayedData = [...newProducts];

          if (res.data.length <= 0) {
            this.sinData = true;
          }

          if (newProducts.length < this.itemsPerPage) {
            this.isLastPage = true;
          } else {
            this.currentPage++;
          }

        },
        error: (error) => {
          console.error('Error fetching All Products:', error);
        }
      });
  }

}
