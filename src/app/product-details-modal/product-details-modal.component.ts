import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { product } from 'src/app/all-products/interfaces/product.interfaces';
import { ValidUrlPipe } from '../shared/pipes/validate-url.pipe';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: 'product-details-modal.component.html',
  styleUrls: ['product-details-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    ValidUrlPipe,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsModalComponent implements AfterViewInit {
  
  @Input() product?: product;
  linkLogo = input.required<string>();

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  constructor(private modalController: ModalController) {
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
      pagination: true,
      navigation: true,
    };
  
    Object.assign(swiperEl, swiperParams);
  
    swiperEl.initialize();
  }

  addToCart() {
    
  }

  buyNow() {
    
  }

}
