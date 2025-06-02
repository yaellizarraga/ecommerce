import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../auth/services/token.service';
import { addressService } from './services/address.service';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { HeaderService } from '../shared/header/services/header.service';
import { AddressModalComponent } from './components/address-modal/address-modal.component';
import { switchMap } from 'rxjs';
import { SpinnerComponent } from "../shared/components/spinner/spinner.component";
import { HeaderModalComponent } from '../shared/header-modal/header-modal.component';

@Component({
  selector: 'app-address',
  templateUrl: 'address.page.html',
  styleUrls: ['address.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AddressCardComponent,
    SpinnerComponent,
    HeaderModalComponent,
],
schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AddressPage {

  loading = false;
  Form: FormGroup;
  errors: any = [];
  UserData: any = {};
  Data: any = [];
  Id = 0;
  link_logo: string = '';
  loadingcards = true;
  @Input() isModal: boolean = false;

   constructor(
    private fb: FormBuilder,
    private addressService: addressService,
    private router: Router,
    private TokenService: TokenService,
    private HeaderService: HeaderService,
    private modalcontroller: ModalController,
    ) {
      this.loadHeader();

      this.TokenService.getUserData().pipe(
        switchMap(data => {
          this.UserData = data;
          return this.addressService.getListData$; // Ejecuta después de obtener UserData
        })
      )
      .subscribe(() => {
        this.loadData();
      });

      
     addIcons({addCircleOutline});
     
     this.Form = this.fb.group({
      Correo: ['', [Validators.required, Validators.email]],
      Clave: ['',[Validators.required , Validators.minLength(8),Validators.maxLength(40)]],
     });
   }

   async openCreateModal(){
    this.loading = true;
    let id = this.UserData?.Id;
    this.Id = id;
    this.addressService.getById(this.Id).subscribe({
        next: async(res: any) => {

          const modal = await this.modalcontroller.create({
            component: AddressModalComponent,
            componentProps: {
              create: true,
              Id: this.Id,
              municipios:res?.municipios,
              paises:res?.paises,
              colonias:res?.colonias,
              estados:res?.estados,
              localidades:res?.localidades,
              link_logo: this.link_logo, 
            },
            cssClass:'custom-modal-class'
          });
      
          await modal.present();
          this.loading = false;

          const { data } = await modal.onWillDismiss();
        },
        error: async(error: any) => {
          console.error('Error fetching Address:', error);
          this.loading = false;
        }
      });


     }

   loadHeader() {
    this.HeaderService.getAll().subscribe({
      next: (res: any) => {
        this.link_logo = res.data[0]?.link_logo;
      },
      error: (error) => {
        console.error('Error fetching Header:', error);
      }
    });
  }
   loadData() {
    let id = this.UserData?.Id;
    this.Id = id;
    this.addressService.getAll(this.Id).subscribe({
      next: (res: any) => {
        this.Data = res;
        this.loadingcards = false;
      },
      error: (error) => {
        console.error('Error fetching Data:', error);
        this.loadingcards = false;
      }
    });
  }

 closeModal() {
    this.modalcontroller.dismiss();
  }


}
