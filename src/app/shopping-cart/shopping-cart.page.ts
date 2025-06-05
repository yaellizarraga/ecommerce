import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AddressPage } from '../address/address.page';
import { TokenService } from '../auth/services/token.service';
import { CartService } from '../services/cart.service';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { ToastComponent } from '../shared/components/toast/toast.component';

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

  cartItems: any[] = [];
  subtotal: number = 0;
  withoutData = false;


  constructor(
    private router: Router,
    private modalcontroller: ModalController,
    private TokenService: TokenService,
    private cartService: CartService,
    private toastComponent: ToastComponent

  ) {
    addIcons({ trashOutline });
  }

  ngOnInit(): void {
    this.loadCart();

    this.cartService.subtotal$.subscribe(total => {
      this.subtotal = total;
    });
  }

  loadCart() {
    this.cartService.cart$.subscribe({
      next: items => {
        if (items && items.length > 0) {
          this.withoutData = false;
          this.cartItems = items;
        } else {
          this.withoutData = true;
          this.cartItems = [];
        }

      },
      error: err => {
        this.withoutData = true;
      },
    });

  }

  async finalizarCompra() {
    this.loadingButton = true;

    if (this.withoutData === true) {
      this.loadingButton = false;
      this.toastComponent.showToast(
        'No tienes Productos que Comprar',
        'bottom',
        'danger',
        5000,
        true
      );
      return;
    }
    const isValid = await this.TokenService.validateSesion();
    if (!isValid) {
      this.loadingButton = false;
      return;
    }

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

  removeFromCart(itemId: number | string) {
    this.cartService.removeFromCart(itemId);
  }

  increaseQuantity(item: any) {
    const newQuantity = item.quantity + 1;
    this.cartService.updateItemQuantity(item.id, newQuantity);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.cartService.updateItemQuantity(item.id, newQuantity);
    }
  }
}
