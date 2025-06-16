import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AddressPage } from '../address/address.page';
import { TokenService } from '../auth/services/token.service';
import { CartService } from '../services/cart.service';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.page.html',
  styleUrls: ['shopping-cart.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
})
export class ShoppingCartPage implements OnInit {

  loading = false;
  loadingButtonActualizar = false;
  loadingButtonFinalizar = false;

  cartItems: any[] = [];
  subtotal: number = 0;
  withoutData = false;

  private readonly destroyRef1 = inject(DestroyRef);
  private readonly destroyRef2 = inject(DestroyRef);
  private readonly destroyRef3 = inject(DestroyRef);

  constructor(
    private router: Router,
    private modalcontroller: ModalController,
    private TokenService: TokenService,
    private cartService: CartService,
    private toastComponent: ToastComponent,
    private AlertComponent: AlertComponent

  ) {
    addIcons({ trashOutline });
  }

  ngOnInit(): void {
    this.loadCart();

    this.cartService.subtotal$.pipe(takeUntilDestroyed(this.destroyRef1)).subscribe(total => {
      this.subtotal = total;
    });
  }

  loadCart() {
    this.cartService.cart$.pipe(takeUntilDestroyed(this.destroyRef2)).subscribe({
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
    this.loadingButtonFinalizar = true;

    if (this.withoutData === true) {
      this.loadingButtonFinalizar = false;
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
      this.loadingButtonFinalizar = false;
      return;
    }

    this.cartService.checkStockAvailability().pipe(takeUntilDestroyed(this.destroyRef3)).subscribe({
      next: async (result) => {

        const outOfStockItems = result.filter((p: any) => !p.enough_stock);

        if (outOfStockItems.length) {

          const message = `${outOfStockItems.map((p: any) => `• ${p.name} (Disponibles: ${p.available_quantity})`).join('<br>')}`;

          const res = await this.AlertComponent.simpleAlert(
            'Algunos productos no tienen suficiente stock:',
            message,
          );

          this.loadingButtonFinalizar = false;
        } else {
          this.nextProcess();
          this.loadingButtonFinalizar = false;
        }
      },
      error: (error) => {
        console.error('Error verificando stock', error);
        this.toastComponent.showToast(
          'Error al verificar stock',
          'bottom',
          'danger',
          5000,
          true
        );
        this.loadingButtonFinalizar = false;
      }
    });

  }

  async nextProcess() {
    const modal = await this.modalcontroller.create({
      component: AddressPage,
      cssClass: 'custom-modal-class',
      componentProps: {
        isModal: true,
      },
    });

    await modal.present();
    this.loadingButtonFinalizar = false;
    const { data } = await modal.onWillDismiss();
  }

  async actualizarCarrito() {
    this.loadingButtonActualizar = true;
    this.router.navigate(['/all-products']);
    this.loadingButtonActualizar = false;
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

  onQuantityInput(event: any, item: any) {

    console.log(event);
    console.log("value");
    const value = parseInt(event.detail.value, 10);
    if (!isNaN(value) && value > 0) {
      item.quantity = value;
      this.cartService.updateItemQuantity(item.id, value);
    } else {
      event.target.value = item.quantity;
    }
  }

}
