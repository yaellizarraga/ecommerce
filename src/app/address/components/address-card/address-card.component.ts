import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { create, trash } from 'ionicons/icons';
import { product } from 'src/app/all-products/interfaces/product.interfaces';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { AddressModalComponent } from '../address-modal/address-modal.component';
import { addressService } from '../../services/address.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { Domicilio } from '../../interfaces/address.interface';
import { ShippingOptionsComponent } from 'src/app/shipping-options/shipping-options.component';

@Component({
  selector: 'app-address-address-card',
  templateUrl: 'address-card.component.html',
  styleUrls: ['address-card.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class AddressCardComponent {

  item = input<Domicilio>();
  link_logo = input<string>();
  loading = false;
  loadingButton = false;
  @Input() isModal: boolean = false;

  constructor(
    private modalcontroller: ModalController,
    private AlertComponent: AlertComponent,
    private AddressService: addressService,
    private toastComponent: ToastComponent,
  ) {
    addIcons({ trash, create });
  }

  
  closeModal() {
    this.modalcontroller.dismiss();
  }

  async SelectAddress(event: any){
  const path = event.composedPath(); 
  const clickedInsideOptionButton = path.some((el: any) => 
    el.classList?.contains?.('button-option') // clase común de "editar" y "eliminar"
  );

  if (!clickedInsideOptionButton && this.isModal) {
    
    this.closeModal();

    const modal = await this.modalcontroller.create({
            component: ShippingOptionsComponent,
            componentProps: {
              linkLogo: this.link_logo, 
            },
            cssClass:'custom-modal-class'
          });
      
          await modal.present();
          this.loading = false;

          const { data } = await modal.onWillDismiss();
    }
  }

  async openEditModal(Id: any) {
    this.loadingButton = true;
    this.AddressService.getById(Id).subscribe({
      next: async (res: any) => {
        console.log(res);
        const modal = await this.modalcontroller.create({
          component: AddressModalComponent,
          componentProps: {
            edit: true,
            link_logo: this.link_logo,
            municipios: res?.municipios,
            paises: res?.paises,
            colonias: res?.colonias,
            estados: res?.estados,
            localidades: res?.localidades,
            data: res?.data,
          },
          cssClass: 'custom-modal-class'
        });

        await modal.present();
        this.loadingButton = false;


        const { data } = await modal.onWillDismiss();

      },
      error: async (error) => {
        console.error('Error fetching Data:', error);
      }
    });



  }

  async deleteItem(Id: any) {
    const res = await this.AlertComponent.simpleAlert(
      'Info',
      '¿Deseas eliminar la dirección?',
    );

    if (res) {
      this.AddressService.delete(Id).subscribe({
        next: (res: any) => {
          this.toastComponent.showToast(
            res.message,
            'bottom',
            'success',
            5000,
            true
          );

          this.AddressService.emitTrigger();
        },
        error: (error: any) => {
          console.log(error);
          this.toastComponent.showToast(
            error.error.message,
            'bottom',
            'danger',
            5000,
            true
          );
        }
      });

    }
  }

}
