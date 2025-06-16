import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from '../shared/components/banner-title/banner-title.component';
import { Filters, product } from './interfaces/product.interfaces';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { ProductService } from './services/product.service';
import { environment } from '../../environments/environment';
import { HeaderService } from '../shared/header/services/header.service';
import { AllProductsService } from './services/all-products.service';
import { take } from 'rxjs';

import { addIcons } from 'ionicons';
import { close, closeCircle, pin, filterCircleOutline } from 'ionicons/icons';
import { FiltersPanelComponent } from './components/filters-panel/filters-panel.component';
import { FiltersPanelMobileComponent } from './components/filters-panel-mobile/filters-panel-mobile.component';
import { FiltersService } from './services/filters.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    ProductCardComponent,
    FiltersPanelComponent,
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
  search: string = '';
  previousSearch: string = '';
  filters = '';
  loading = true;
  sinData = false;
  filtersData = [];
  filtersDataMobile = signal([]);
  PanelFiltersData: Filters = {};
  loadFiltersButton = false;

  private readonly destroyRef1 = inject(DestroyRef);
  private readonly destroyRef2 = inject(DestroyRef);
  private readonly destroyRef3 = inject(DestroyRef);
  private readonly destroyRef4 = inject(DestroyRef);
  private readonly destroyRef5 = inject(DestroyRef);
  
  constructor(
    private ProductService: ProductService,
    private AllProductsService: AllProductsService,
    private FiltersService: FiltersService,
    private HeaderService: HeaderService,
    private modalcontroller: ModalController,
  ) {
    addIcons({ close, closeCircle, pin, filterCircleOutline });
  }

  ngOnInit(): void {
    
    this.FiltersService.getFiltros().pipe(takeUntilDestroyed(this.destroyRef1)).subscribe(value => {
      this.FiltrandoData(value);
    });

    this.loadHeader();
    this.loadBanner();
    this.loadFilters();


  }

  FiltrandoData(event: Filters) {
    this.PanelFiltersData = event;
    this.loading = true;
    this.sinData = false;
    this.currentPage = 1;
    this.isLastPage = false;
    this.displayedData = []; // Reinicia la lista solo si es una nueva búsqueda
    this.loadData();

  }

  filtrarListaBusqueda(event: any) {
    const busqueda = event.target.value.toLowerCase(); // Obtiene el valor y lo convierte a minúsculas
    this.loading = true;
    this.sinData = false;
    this.search = busqueda;
    this.currentPage = 1;
    this.isLastPage = false;
    this.loadData();
  }

  loadHeader() {
    this.HeaderService.getAll().pipe(takeUntilDestroyed(this.destroyRef2)).subscribe({
      next: (res: any) => {
        this.link_logo = (res.data.length > 0) ? res.data[0].preview : '';

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadBanner() {
    this.AllProductsService.getAll().pipe(takeUntilDestroyed(this.destroyRef3)).subscribe({
      next: (res: any) => {
        this.backgroudUrl = (res.data.length > 0) ? res.data[0].preview : '';

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  async loadFilters() {
    await this.FiltersService.getAll().pipe(takeUntilDestroyed(this.destroyRef4)).subscribe({
      next: (res: any) => {
        this.filtersData = res.data;
        this.filtersDataMobile.set(res.data);
      },
      error: (error) => {
        console.error('Error fetching Filters:', error);
      }
    });
  }

  loadData(event?: any) {
    if (this.isLastPage) {
      if (event) event.target.complete();
      return;
    }

    const isNewSearch = this.previousSearch !== this.search.trim();
    if (isNewSearch) {
      this.displayedData = []; // Reinicia la lista solo si es una nueva búsqueda
      this.currentPage = 1; // Reinicia la paginación
      this.isLastPage = false; // Asegura que pueda seguir paginando
    }


    if (this.search.trim() !== '') {
      this.filters = `?page=${this.currentPage}&search=${this.search}`;
    } else {
      this.filters = `?page=${this.currentPage}`;
    }

    if (this.PanelFiltersData && Object.keys(this.PanelFiltersData).length > 0) {
      Object.keys(this.PanelFiltersData).forEach(tipo => {
        this.PanelFiltersData[tipo].forEach(filter => {
          this.filters += `&${tipo}[]=${encodeURIComponent(filter)}`;
        });
      });

    }
    

    this.ProductService.getAll(this.filters).pipe(
      take(1), takeUntilDestroyed(this.destroyRef5)).subscribe({
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

          this.displayedData = [...this.displayedData, ...newProducts];
          if (res.data.length <= 0) {
            this.sinData = true;
          }

          if (newProducts.length < this.itemsPerPage) {
            this.isLastPage = true;
          } else {
            this.currentPage++;
          }

          this.previousSearch = this.search.trim();

          if (event) event.target.complete();
        },
        error: (error) => {
          console.error('Error fetching All Products:', error);
          if (event) event.target.complete();
        }
      });
  }


  async openModalFiltersMobile() {
    this.loadFiltersButton = true;
    const modal = await this.modalcontroller.create({
      component: FiltersPanelMobileComponent,
      cssClass: 'custom-modal-class',
      componentProps: {
        data: this.filtersDataMobile,
      },
    });
  
    await modal.present();
    this.loadFiltersButton = false;
    const { data } = await modal.onWillDismiss();
    
  }
  

}

