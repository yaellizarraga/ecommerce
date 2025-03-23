import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { product } from 'src/app/all-products/interfaces/product.interfaces';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { ValidUrlPipe } from 'src/app/shared/pipes/validate-url.pipe';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addressService } from '../../services/address.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-address-modal',
  templateUrl: 'address-modal.component.html',
  styleUrls: ['address-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    ValidUrlPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddressModalComponent implements OnInit {

  @Input() product?: product;
  linkLogo = input<string>();
  @Input() create?: boolean = false;
  @Input() edit?: boolean = false;
  @Input() municipios: any = [];
  @Input() paises: any = [];
  @Input() colonias: any = [];
  @Input() estados: any = [];
  @Input() localidades: any = [];
  @Input() data: any;
  @Input() Id?: any = 0;
  
  loading = false;
  errors: any = [];
  Form: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private AddressService: addressService,
    private toastComponent: ToastComponent,
  ) {
    addIcons({ close });

    this.Form = this.fb.group({
      Id_Persona_Direccion: [null], 
      Id_Usuario: [null], 
      Calle: ['', [Validators.required, Validators.maxLength(100)]],
      Colonia: ['', [Validators.required, Validators.maxLength(100)]],
      Estado: ['', [Validators.required, Validators.maxLength(100)]],
      Pais: [1, [Validators.required, Validators.maxLength(100)]],
      Num_Int: ['', [Validators.maxLength(10)]], 
      Num_Ext: ['', [Validators.required, Validators.maxLength(10)]],
      Indicaciones: [''], 
      Entre_Calle1: ['', [Validators.maxLength(100)]], 
      Entre_Calle2: ['', [Validators.maxLength(100)]], 
      Geolocalizacion: ['', [Validators.maxLength(100)]], 
      Imagen_Domicilio: ['', [Validators.maxLength(200)]], 
      Referencia: ['', [Validators.maxLength(200)]], 
      Localidad: ['', [Validators.required, Validators.maxLength(100)]],
      Municipio: ['', [Validators.required, Validators.maxLength(100)]],
    });

  }

  ngOnInit(){

    if(Object.keys(this.data).length > 0){
     this.updateForm(this.data);
    }

  }
  clearError(field: string) {
    if (this.errors && this.errors[field]) {
      delete this.errors[field];
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async sendAddress() {
    this.loading = true;
    this.errors = [];

    const data = {
      Id_Persona_Direccion: this.Form.value.Id_Persona_Direccion,
      Id_Usuario: this.Form.value.Id_Usuario,
      Calle: this.Form.value.Calle,
      Colonia: this.Form.value.Colonia,
      Estado: this.Form.value.Estado,
      Pais: this.Form.value.Pais,
      Num_Int: this.Form.value.Num_Int,
      Num_Ext: this.Form.value.Num_Ext,
      Indicaciones: this.Form.value.Indicaciones,
      Entre_Calle1: this.Form.value.Entre_Calle1,
      Entre_Calle2: this.Form.value.Entre_Calle2,
      Geolocalizacion: this.Form.value.Geolocalizacion,
      Imagen_Domicilio: this.Form.value.Imagen_Domicilio,
      Referencia: this.Form.value.Referencia,
      Localidad: this.Form.value.Localidad,
      Municipio: this.Form.value.Municipio,
      
    };

    if (this.edit === true) {
      this.updateData(data);
    }
    if (this.create === true) {
      this.createData(data);
    }
   

  }

  async createData(data:any){
    this.AddressService.create(this.Id,data).subscribe({
      next: (res: any) => {
        this.updateForm(res.data);
        this.loading = false;
        this.AddressService.emitTrigger();
        this.toastComponent.showToast(
          res.message,
          'bottom',
          'success',
          5000,
          true
        );
      },
      error: (error) => {
        if(error.error.errors){
          this.errors = error.error.errors;
        }
        if(error.error.message){
          this.toastComponent.showToast(
            error.error.message,
            'bottom',
            'danger',
            5000,
            true
          );
        }
        this.loading = false;
      }
    });
  }
  async updateData(data:any){
    this.Id = this.Form.value.Id_Persona_Direccion;
    this.AddressService.update(this.Id,data).subscribe({
      next: (res: any) => {
        this.updateForm(res.data);
        this.loading = false;
        this.AddressService.emitTrigger();
        this.toastComponent.showToast(
          res.message,
          'bottom',
          'success',
          5000,
          true
        );
      },
      error: (error) => {
        if(error.error.errors){
          this.errors = error.error.errors;
        }
        if(error.error.message){
          this.toastComponent.showToast(
            error.error.message,
            'bottom',
            'danger',
            5000,
            true
          );
        }
        this.loading = false;
      }
    });
  }
  async updateForm(data: any) {

    console.log(data);
    this.Form.patchValue({
      Id_Persona_Direccion:data?.Id_Persona_Direccion || '',
      Id_Usuario:data?.Id_Usuario || '',
      Calle:data?.Calle || '',
      Colonia:data?.Colonia || '',
      Estado:data?.Estado || '',
      Pais:data?.Pais || '',
      Num_Int:data?.Num_Int || '',
      Num_Ext:data?.Num_Ext || '',
      Indicaciones:data?.Indicaciones || '',
      Entre_Calle1:data?.Entre_Calle1 || '',
      Entre_Calle2:data?.Entre_Calle2 || '',
      Geolocalizacion:data?.Geolocalizacion || '',
      Imagen_Domicilio:data?.Imagen_Domicilio || '',
      Referencia:data?.Referencia || '',
      Localidad:data?.Localidad || '',
      Municipio:data?.Municipio || '',
    });
  }


}
