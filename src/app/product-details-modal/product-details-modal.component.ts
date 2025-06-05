import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef, Input, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { product } from 'src/app/all-products/interfaces/product.interfaces';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { HeaderModalComponent } from "../shared/header-modal/header-modal.component";
import { TokenService } from '../auth/services/token.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: 'product-details-modal.component.html',
  styleUrls: ['product-details-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HeaderModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsModalComponent implements AfterViewInit {

  @Input() product?: product;
  linkLogo = input.required<string>();
  loadingButton = false;

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  constructor(
    private modalController: ModalController,
    private TokenService: TokenService,
    private cartService: CartService,
    private router: Router,
  ) {
    addIcons({ close });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  ngAfterViewInit() {
    const swiperEl = this.swiperContainer.nativeElement;

    const swiperParams = {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      zoom: {
        maxRatio: 5,
      },
      pagination: true,
      navigation: true,
    };

    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();
  }

  async addToCart(product: any) {
    this.loadingButton = true;

    console.log(product);

    const isValid = await this.TokenService.validateSesion();
    if (!isValid) {
      this.closeModal();
      this.loadingButton = false;
      return;
    }

    const item = {
      id: product.id,
      name: product.productName,
      price: parseFloat(product.price),
      discount: parseFloat(product.discount),
      quantity: 1,
      image: product.imgUrl,
      details: {
        descripcion: product.description,
        familia: product.familia,
        categoria: product.categoria,
        modelo: product.modelo,
        marca: product.marca,
        color: product.color,
        medida: product.medida
      }
    };

    this.cartService.addToCart(item);

    this.loadingButton = false;
  }

  async goToCart() {
    this.closeModal();
    this.router.navigate(['/shopping-cart']);
  }

  buyNow() {

  }

}
