import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { RouterModule } from '@angular/router';
import { HeaderModalComponent } from "../shared/header-modal/header-modal.component";
import { HeaderService } from '../shared/header/services/header.service';
import { environment } from 'src/environments/environment';
import { ThanksPurchaseTempleteComponent } from '../thanks-purchase-templete/thanks-purchase-templete.component';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { CartService } from '../services/cart.service';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { CheckoutData } from './interfaces/payment.interfaces';
import { PaymentService } from './services/payment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { take } from 'rxjs';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HeaderModalComponent,
    SpinnerComponent,
    NgxPayPalModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {

  link_logo = '';
  productos: any;
  subtotal = 0;
  address = '';
  typeSend = 0;
  fullName = '';
  id = 0;
  loading = false;
  loadingButton = false;
  data!: CheckoutData;

  private readonly destroyRef1 = inject(DestroyRef);
  private readonly destroyRef2 = inject(DestroyRef);
  public payPalConfig?: IPayPalConfig;
  constructor(
    private HeaderService: HeaderService,
    private modalcontroller: ModalController,
    private toastComponent: ToastComponent,
    private cartService: CartService,
    private paymentService: PaymentService,
  ) { }

  ngOnInit() {
    this.loadHeader();
    this.pay();

  }

  loadHeader() {
    this.HeaderService.getAll().pipe(takeUntilDestroyed(this.destroyRef1)).subscribe({
      next: (res: any) => {
        this.link_logo = (res.data.length > 0) ? res.data[0].preview : '';
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  async pay(apartado: boolean = false) {
    this.loading = true;
    this.cartService.subtotal$.pipe(take(1), takeUntilDestroyed(this.destroyRef2)).subscribe(async (total) => {
      this.subtotal = total;
      this.address = await localStorage.getItem("address") || "";
      this.typeSend = await Number(localStorage.getItem("type_send")) || 0;
      this.fullName = await JSON.parse(localStorage.getItem("userData") || '[]')?.NombreCompleto || "";
      this.productos = await JSON.parse(localStorage.getItem("cart_items") || '[]') || "";
      this.id = await JSON.parse(localStorage.getItem("userData") || '[]')?.Id || "";

      this.data = {
        productos: this.productos,
        subtotal: this.subtotal,
        address: this.address,
        typeSend: this.typeSend,
        fullName: this.fullName
      };

      if (apartado) {
        this.apartado();
      } else {
        await this.initConfig();
      }
      this.loading = false;
    });
  }

  apartado(){
    this.loadingButton = true;

  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: environment.ClientId,
      createOrderOnClient: (data) => <ICreateOrderRequest>({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'MXN',
            value: this.subtotal.toString()
          }
        }]
      }),
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        actions.order.get().then((details: any) => {
          console.log('Detalles de la orden aprobada:', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('Transacción completada:', data);

        this.loading = true;
        this.paymentService.create(this.data, this.id)
          .pipe(takeUntilDestroyed(this.destroyRef1))
          .subscribe(async () => {
            this.cartService.clearCart();
            this.closeModal();
            const modal = await this.modalcontroller.create({
              component: ThanksPurchaseTempleteComponent,
              componentProps: {
                linkLogo: this.link_logo,
                data: data,
              },
              cssClass: 'custom-modal-class'
            });
            await modal.present();
            this.loading = false;
          });
      },
      onCancel: (data, actions) => {
        console.log('onCancel', data, actions);
        this.toastComponent.showToast('Pago cancelado', 'bottom', 'warning', 5000, true);
      },
      onError: err => {
        console.log('onError', err);
        this.toastComponent.showToast('Error en el pago', 'bottom', 'danger', 5000, true);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }



  closeModal() {
    this.modalcontroller.dismiss();
  }

}
