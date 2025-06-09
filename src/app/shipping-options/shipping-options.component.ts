import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { RouterModule } from '@angular/router';
import { HeaderModalComponent } from "../shared/header-modal/header-modal.component";
import { HeaderService } from '../shared/header/services/header.service';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-shipping-options',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HeaderModalComponent
  ],
  templateUrl: './shipping-options.component.html',
  styleUrl: './shipping-options.component.scss',
})
export class ShippingOptionsComponent implements OnInit {

  link_logo = '';
  card: any;
  loading = false;

  constructor(
    private HeaderService: HeaderService,
    private modalcontroller: ModalController,
  ) { }

  ngOnInit() {
    this.loadHeader();
  }

  loadHeader() {
    this.HeaderService.getAll().subscribe({
      next: (res: any) => {
        this.link_logo = (res.data.length > 0) ? res.data[0].preview : '';
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  closeModal() {
    this.modalcontroller.dismiss();
  }

  async SelectShipping(id: number) {

    this.closeModal();

    const modal = await this.modalcontroller.create({
      component: PaymentComponent,
      componentProps: {
        linkLogo: this.link_logo,
      },
      cssClass: 'custom-modal-class'
    });

    await modal.present();
    this.loading = false;

    const { data } = await modal.onWillDismiss();
  }

}
