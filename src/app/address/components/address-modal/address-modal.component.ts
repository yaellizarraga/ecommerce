import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, inject, Input, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { product } from 'src/app/all-products/interfaces/product.interfaces';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { ValidUrlPipe } from 'src/app/shared/pipes/validate-url.pipe';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addressService } from '../../services/address.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  imagenTemporal: string = '';
  imagen: any = undefined;
  private readonly destroyRef1 = inject(DestroyRef);
  private readonly destroyRef2 = inject(DestroyRef);

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
      Imagen_Domicilio: [null],
      Referencia: ['', [Validators.maxLength(200)]],
      Localidad: ['', [Validators.required, Validators.maxLength(100)]],
      Municipio: ['', [Validators.required, Validators.maxLength(100)]],
    });

  }

  async ngOnInit() {

    console.log(this.data);
    if (this.data !== undefined && Object.keys(this.data).length > 0) {
      this.updateForm(this.data);
    } else {
      if (Capacitor.getPlatform() !== 'web') {
        const permResult = await Geolocation.requestPermissions();
        if (permResult.location === 'granted') {
          const coordinates = await Geolocation.getCurrentPosition();
          let latitude = coordinates.coords.latitude.toString();
          let longitude = coordinates.coords.longitude.toString();
          this.Form.get('Geolocalizacion')?.setValue(`${latitude},${longitude}`);
        }
      } else {
        const coordinates = await Geolocation.getCurrentPosition();
        let latitude = coordinates.coords.latitude.toString();
        let longitude = coordinates.coords.longitude.toString();
        this.Form.get('Geolocalizacion')?.setValue(`${latitude},${longitude}`);

      }
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

    const formData = new FormData();

    // Agregar cada campo al FormData
    if (this.imagen && this.imagen?.size > 0) {
      formData.append('Imagen_Domicilio', this.imagen);
    }

    formData.append('Id_Persona_Direccion', this.Form.value.Id_Persona_Direccion || '');
    formData.append('Id_Usuario', this.Form.value.Id_Usuario || '');
    formData.append('Calle', this.Form.value.Calle || '');
    formData.append('Colonia', this.Form.value.Colonia || '');
    formData.append('Estado', this.Form.value.Estado || '');
    formData.append('Pais', this.Form.value.Pais || '');
    formData.append('Num_Int', this.Form.value.Num_Int || '');
    formData.append('Num_Ext', this.Form.value.Num_Ext || '');
    formData.append('Indicaciones', this.Form.value.Indicaciones || '');
    formData.append('Entre_Calle1', this.Form.value.Entre_Calle1 || '');
    formData.append('Entre_Calle2', this.Form.value.Entre_Calle2 || '');
    formData.append('Geolocalizacion', this.Form.value.Geolocalizacion || '');
    formData.append('Referencia', this.Form.value.Referencia || '');
    formData.append('Localidad', this.Form.value.Localidad || '');
    formData.append('Municipio', this.Form.value.Municipio || '');

    if (this.edit === true) {
      this.updateData(formData);
    }
    if (this.create === true) {
      this.createData(formData);
    }


  }

  async createData(data: any) {
    this.AddressService.create(this.Id, data).pipe(takeUntilDestroyed(this.destroyRef1)).subscribe({
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
        if (error.error.errors) {
          this.errors = error.error.errors;
        }
        if (error.error.message) {
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
  async updateData(data: any) {
    this.Id = this.Form.value.Id_Persona_Direccion;
    this.AddressService.update(this.Id, data).pipe(takeUntilDestroyed(this.destroyRef2)).subscribe({
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
        if (error.error.errors) {
          this.errors = error.error.errors;
        }
        if (error.error.message) {
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

  isValidUrl(url: string | undefined): boolean {
    return !!url && (url.startsWith('http://') || url.startsWith('https://'));
  }

  async updateForm(data: any) {

    this.imagen = undefined;
    this.imagenTemporal = data?.Imagen_Domicilio || '';
    if (data?.Imagen_Domicilio) {
      let res = await this.isValidUrl(data?.Imagen_Domicilio);

      if (res) {
        this.imagenTemporal = data?.Imagen_Domicilio;
      }
    }

    this.Form.patchValue({
      Id_Persona_Direccion: data?.Id_Persona_Direccion || '',
      Id_Usuario: data?.Id_Usuario || '',
      Calle: data?.Calle || '',
      Colonia: data?.Colonia || '',
      Estado: data?.Estado || '',
      Pais: data?.Pais || '',
      Num_Int: data?.Num_Int || '',
      Num_Ext: data?.Num_Ext || '',
      Indicaciones: data?.Indicaciones || '',
      Entre_Calle1: data?.Entre_Calle1 || '',
      Entre_Calle2: data?.Entre_Calle2 || '',
      Geolocalizacion: data?.Geolocalizacion || '',
      Referencia: data?.Referencia || '',
      Localidad: data?.Localidad || '',
      Municipio: data?.Municipio || '',
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      this.imagen = file;

      // Usamos FileReader para obtener la URL del archivo
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenTemporal = e.target.result; // Guardamos la URL generada en imageUrl
      };

      reader.readAsDataURL(file); // Cargamos el archivo y obtenemos su URL
    }
  }


}
