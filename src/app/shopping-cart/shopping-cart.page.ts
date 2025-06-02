import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AddressPage } from '../address/address.page';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.page.html',
  styleUrls: ['shopping-cart.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
  ],
})
export class ShoppingCartPage implements OnInit {

  loading = false;
  loadingButton = false;

  constructor(
    private router: Router,
    private modalcontroller: ModalController,
) {
  }

  ngOnInit(): void {
    console.log("shopping");
  }

  async finalizarCompra() {
        this.loadingButton = true;
        const modal = await this.modalcontroller.create({
          component: AddressPage,
          cssClass: 'custom-modal-class',
          componentProps: {
            isModal: true,
          },
        });
      
        await modal.present();
        this.loadingButton = false;
        const { data } = await modal.onWillDismiss();
        
  }

  async actualizarCarrito() {
    this.loadingButton = true;
    this.router.navigate(['/all-products']);
    this.loadingButton = false;
  }


}
