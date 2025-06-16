import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from '../shared/header/services/header.service';
import { HeaderModalComponent } from '../shared/header-modal/header-modal.component';
import { checkmarkCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { environment } from 'src/environments/environment';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-thanks-purchase-templete',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HeaderModalComponent,
  ],
  templateUrl: './thanks-purchase-templete.component.html',
  styleUrl: './thanks-purchase-templete.component.scss',
})
export class ThanksPurchaseTempleteComponent implements OnInit {

  @Input() data: any = {};
  link_logo = '';
  loading = false;

  transactionId!: string;
  amount!: string;
  currency!: string;
  status!: string;
  fullName!: string;
  email!: string;

  addressLine1!: string;
  addressLine2?: string;
  city!: string;
  state!: string;
  postalCode!: string;
  country!: string;

  ngOnInit() {
    this.loadHeader();
  }
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private HeaderService: HeaderService,
    private modalcontroller: ModalController,
    private router: Router,
  ) {
    addIcons({ checkmarkCircle });
  }

  loadHeader() {
    this.HeaderService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.link_logo = (res.data.length > 0) ? res.data[0].preview : '';
        this.sendEmailCheck();

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  closeModal() {
    this.modalcontroller.dismiss();
  }


  async navigateTo(url: string) {
    this.closeModal();
    this.router.navigate([url]);
  }

  sendEmailCheck() {

    const capture = this.data.purchase_units[0]?.payments?.captures[0];
    const shipping = this.data.purchase_units[0]?.shipping;

    this.transactionId = capture?.id;
    this.amount = capture?.amount?.value;
    this.currency = capture?.amount?.currency_code;
    this.status = this.data.status;
    this.fullName = shipping?.name?.full_name;
    this.email = this.data.payer?.email_address;

    this.addressLine1 = shipping?.address?.address_line_1;
    this.addressLine2 = shipping?.address?.address_line_2;
    this.city = shipping?.address?.admin_area_2;
    this.state = shipping?.address?.admin_area_1;
    this.postalCode = shipping?.address?.postal_code;
    this.country = shipping?.address?.country_code;

    const templateParams = {
      logo: this.link_logo,
      transaction_id: this.transactionId,
      full_name: this.fullName,
      email: this.email,
      amount: this.amount,
      currency: this.currency,
      status: this.status,
      address_line1: this.addressLine1,
      address_line2: this.addressLine2 || '',
      city: this.city,
      state: this.state,
      postal_code: this.postalCode,
      country: this.country,
    };
    console.log(templateParams)
    emailjs.send(environment.ServiceID, environment.TemplateCompra, templateParams, { publicKey: environment.publicKey, })
      .then(
        () => {
          console.log(templateParams)
          console.log('El correo se envio correctamente!');
        },
        (error) => {
          console.log('Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.', (error as EmailJSResponseStatus).text);
        },
      );

  }

}
