import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { RouterModule } from '@angular/router';
import { StatusModalComponent } from './components/status-modal/status-modal.component';
import { OrderService } from './services/order.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order.page',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './order.page.html',
  styleUrl: './order.page.scss',
})
export class OrderPage implements OnInit {

  loading = false;
  link_logo = '';
  id = 0;
  data: any = [];
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private modalcontroller: ModalController,
    private OrderService: OrderService,
  ) { }

  async ngOnInit() {
    this.id = await JSON.parse(localStorage.getItem("userData") || '[]')?.Id || "";
    this.OrderService.getAll(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => {
        this.data = value ? this.data = Object.entries(value) : [];
      },
      error: (error: any) => {
        this.data = [];
      }
    });
  }

  async verBitacora(bitacora: any) {

    const modal = await this.modalcontroller.create({
      component: StatusModalComponent,
      componentProps: {
        linkLogo: this.link_logo,
        bitacora: bitacora,
      },
      cssClass: 'custom-modal-class'
    });

    await modal.present();
    this.loading = false;

    const { data } = await modal.onWillDismiss();
  }

  closeModal() {
    this.modalcontroller.dismiss();
  }



}
