import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { RouterModule } from '@angular/router';
import { StatusModalComponent } from './components/status-modal/status-modal.component';

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
  
  envios = [
    {
      numeroGuia: 'MX0012456789',
      estatus: 'En tránsito',
      cliente: 'Carlos López',
      fechaRecoleccion: '2025-06-01T10:30:00',
      repartidorId: 201,
      repartidor: 'José Martínez'
    },
    {
      numeroGuia: 'MX0012456790',
      estatus: 'Pendiente',
      cliente: 'María Rodríguez',
      fechaRecoleccion: '2025-06-02T09:00:00',
      repartidorId: 202,
      repartidor: 'Ana Fernández'
    },
    {
      numeroGuia: 'MX0012456791',
      estatus: 'Entregado',
      cliente: 'Luis García',
      fechaRecoleccion: '2025-05-31T14:45:00',
      repartidorId: 203,
      repartidor: 'Pedro Sánchez'
    },
    {
      numeroGuia: 'MX0012456792',
      estatus: 'Cancelado',
      cliente: 'Laura Méndez',
      fechaRecoleccion: '2025-06-03T16:00:00',
      repartidorId: 204,
      repartidor: 'Sofía Jiménez'
    },
    {
      numeroGuia: 'MX0012456793',
      estatus: 'En almacén',
      cliente: 'Jorge Ramírez',
      fechaRecoleccion: '2025-06-04T08:20:00',
      repartidorId: 205,
      repartidor: 'Miguel Torres'
    }
  ];


  constructor(
    private modalcontroller: ModalController,
  ) { }

  ngOnInit() {
    console.log("orders");
  }

  async verBitacora(envio: any) {
    this.closeModal();

    const modal = await this.modalcontroller.create({
      component: StatusModalComponent,
      componentProps: {
        linkLogo: this.link_logo,
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
