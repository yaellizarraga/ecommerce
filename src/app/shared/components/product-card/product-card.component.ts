import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { product } from 'src/app/all-products/interfaces/product.interfaces';
import { ProductDetailsModalComponent } from 'src/app/product-details-modal/product-details-modal.component';

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
  linkLogo = input.required<string>();

  constructor(private modalcontroller: ModalController) {}

  async openModalDetails(item: any){

    const modal = await this.modalcontroller.create({
      component: ProductDetailsModalComponent,
      componentProps: {
        product: item,
        linkLogo: this.linkLogo,
      },
      cssClass:'custom-modal-class'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
  }


}
