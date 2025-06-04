import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from '../shared/header/services/header.service';
import { HeaderModalComponent } from '../shared/header-modal/header-modal.component';
import { checkmarkCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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

  @Input() data:any = {};
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
  }

  constructor(
    private HeaderService: HeaderService,
    private modalcontroller: ModalController,
    private router: Router,
  ) { 
    addIcons({checkmarkCircle});
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

  closeModal() {
    this.modalcontroller.dismiss();
  }

  async order() {
    this.router.navigate(['/order']);
  }

  seguirComprando(){
    this.router.navigate(['/all-products']);
  } 

}
