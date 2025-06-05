import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { RouterModule } from '@angular/router';
import { HeaderModalComponent } from "../shared/header-modal/header-modal.component";
import { HeaderService } from '../shared/header/services/header.service';
import { environment } from 'src/environments/environment';
import { ThanksPurchaseTempleteComponent } from '../thanks-purchase-templete/thanks-purchase-templete.component';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HeaderModalComponent
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {

  link_logo = '';
  card: any;
  subtotal: number = 0;
  constructor(
    private HeaderService: HeaderService,
    private modalcontroller: ModalController,
    private toastComponent: ToastComponent,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.loadHeader();
    this.pay();

  }

  loadHeader() {
    this.HeaderService.getAll().subscribe({
      next: (res: any) => {
        this.link_logo = res.data[0]?.link_logo;
      },
      error: (error: any) => {
        console.error('Error fetching Header:', error);
      }
    });
  }

  async pay() {
    const paypalClientId = environment.ClientId;

    this.cartService.subtotal$.subscribe(total => {
      this.subtotal = total;

      if (!document.querySelector('#paypal-sdk')) {
        const script = document.createElement('script');
        script.id = 'paypal-sdk';
        script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=MXN`;
        script.onload = () => this.renderPayPalButton();
        document.body.appendChild(script);
      } else {
        this.renderPayPalButton();
      }
    });
  }

  renderPayPalButton() {
    if ((window as any).paypal) {
      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: `${this.subtotal}` // Monto en MXN
              }
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          return actions.order.capture().then(async (details: any) => {
            if (details.status === "COMPLETED") {

              ThanksPurchaseTempleteComponent
              this.closeModal();

              const modal = await this.modalcontroller.create({
                component: ThanksPurchaseTempleteComponent,
                componentProps: {
                  linkLogo: this.link_logo,
                  data: details,
                },
                cssClass: 'custom-modal-class'
              });

              await modal.present();

              const { data } = await modal.onWillDismiss();
            }

            console.log(details);
            console.log('Pago completado por', details.payer.name.given_name);
            // Puedes llamar a tu backend aquí si deseas registrar la compra
          });
        },
        onError: (err: any) => {
          console.error('Error en el pago:', err);
          this.toastComponent.showToast(
            'Error en el pago',
            'bottom',
            'danger',
            5000,
            true
          );
        }
      }).render('#paypal-button-container'); // Asegúrate de tener este div en tu HTML
    }
  }

  closeModal() {
    this.modalcontroller.dismiss();
  }

}
