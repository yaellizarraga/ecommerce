import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenService } from '../auth/services/token.service';
import { ProfileService } from './services/profile.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProfilePage implements OnInit {

  loading = false;
  token = false;
  UserData: any = {};
  Id = 0;
  FotoTemporal: string = '';
  Foto: any = undefined;
  constancia: any = undefined;
  constanciaTemporal: any = undefined;

  giro: any = [];
  usoCFDI: any = [];
  regimenFiscal: any = [];

  Form: FormGroup;
  errors: any = [];

  constructor(
    private TokenService: TokenService,
    private ProfileService: ProfileService,
    private fb: FormBuilder,
    private toastComponent: ToastComponent,
  ) {
    addIcons({eye})

    this.Form = this.fb.group({
      Foto: [null],
      Nombre: ['', [Validators.required, Validators.maxLength(80)]],
      Apellido_Paterno: ['', [Validators.required, Validators.maxLength(40)]],
      Apellido_Materno: ['', [Validators.maxLength(40)]],
      Whatsapp: ['', [Validators.maxLength(100)]],
      Telefono: ['', [Validators.maxLength(45), Validators.pattern('^[0-9]+$')]], // Solo números
      Celular: ['', [Validators.maxLength(45), Validators.pattern('^[0-9]+$')]], // Solo números

      Correo: ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
      Usuario: ['', [Validators.maxLength(40)]],
      ClaveActual: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      Clave: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      Clave2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],

      RFC: ['', [Validators.maxLength(150)]],
      Giro: ['', [Validators.pattern('^[0-9]+$')]],
      razonsocial: ['', [Validators.maxLength(300)]],
      regimenfiscal: ['', [Validators.maxLength(100)]],
      codigopostalcliente: ['', [Validators.maxLength(100), Validators.pattern('^[0-9]+$')]], // Solo números
      usocfdi: ['', [Validators.maxLength(60)]],
      constancia: [null],
    });


  }
  clearError(field: string) {
    if (this.errors && this.errors[field]) {
      delete this.errors[field];
    }
  }

  ngOnInit(): void {
    this.TokenService.getToken().subscribe((token) => {
      this.token = token;
    });
    this.TokenService.getUserData().subscribe((data) => {
      this.UserData = data;
      this.loadProfile();
    });
  }

  async sendProfile() {
    this.loading = true;
    this.errors = [];

    const formData = new FormData();

    // Agregar cada campo al FormData
    if (this.Foto && this.Foto?.size > 0) {
      formData.append('Foto', this.Foto);
    } 

    formData.append('Nombre', this.Form.value.Nombre);
    formData.append('Apellido_Paterno', this.Form.value.Apellido_Paterno);
    formData.append('Apellido_Materno', this.Form.value.Apellido_Materno);
    formData.append('Whatsapp', this.Form.value.Whatsapp);
    formData.append('Telefono', this.Form.value.Telefono);
    formData.append('Celular', this.Form.value.Celular);

    this.ProfileService.updateProfile(formData, this.Id).subscribe({
      next: (res: any) => {
        this.updateForm(res.data);
        this.TokenService.setUserData(res.data);
        this.loading = false;
        
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

  async sendTaxData() {
    this.loading = true;
    this.errors = [];

    const formData = new FormData();

    formData.append('RFC', this.Form.value.RFC);
    formData.append('Giro', this.Form.value.Giro);
    formData.append('razonsocial', this.Form.value.razonsocial);
    formData.append('regimenfiscal', this.Form.value.regimenfiscal);
    formData.append('codigopostalcliente', this.Form.value.codigopostalcliente);
    formData.append('usocfdi', this.Form.value.usocfdi);
    
    this.ProfileService.updateTaxData(formData, this.Id).subscribe({
      next: (res: any) => {
        this.updateForm(res.data);
        this.TokenService.setUserData(res.data);
        this.loading = false;
        
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

  async sendResetPassword() {
    this.loading = true;
    this.errors = [];

    const formData = new FormData();

    formData.append('ClaveActual', this.Form.value.ClaveActual);
    formData.append('Clave', this.Form.value.Clave);
    formData.append('Clave2', this.Form.value.Clave2);
    
    this.ProfileService.updateResetPassword(formData, this.Id).subscribe({
      next: (res: any) => {
        this.updateForm(res.data);
        this.TokenService.setUserData(res.data);
        this.loading = false;
        
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
          console.error(error);
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

  async loadProfile() {
    let id = this.UserData?.Id;
    this.Id = id;
    this.ProfileService.getById(id).subscribe({
      next: (res: any) => {
        this.giro = res.giro;
        this.usoCFDI = res.usoCFDI;
        this.regimenFiscal = res.regimenFiscal;
        this.updateForm(res.data);

      },
      error: (error) => {
        console.error('Error fetching get data:', error);
      }
    });
  }
  
  isValidUrl(url: string | undefined): boolean {
    return !!url && (url.startsWith('http://') || url.startsWith('https://'));
  }
  
  async updateForm(data: any) {
    this.Foto = undefined;
    this.FotoTemporal = data?.Foto || '';
     if (data?.Foto) {
      let res = await this.isValidUrl(data?.Foto);

      if (res) {
        this.FotoTemporal = data?.Foto;
      } else {
        this.FotoTemporal = environment.UrlImages + 'images/usuarios/' + data?.Foto;
      }
    } else {
      this.FotoTemporal = 'assets/icons/avatar.svg';
    }

    this.constanciaTemporal = data?.constancia || '';

    this.Form.patchValue({
      Nombre: data?.Nombre || '',
      Apellido_Paterno: data?.Apellido_Paterno || '',
      Apellido_Materno: data?.Apellido_Materno || '',
      RFC: data?.RFC || '',
      Giro: data?.Giro || 0,
      Telefono: data?.Telefono || '',
      Celular: data?.Celular || '',
      Correo: data?.Correo || '',
      Usuario: data?.Usuario || '',
      Whatsapp: data?.Whatsapp || '',
      razonsocial: data?.razonsocial || '',
      regimenfiscal: data?.regimenfiscal || '',
      codigopostalcliente: data?.codigopostalcliente || '',
      usocfdi: data?.usocfdi || '',
      ClaveActual: '', 
      Clave: '',
      Clave2: ''  
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      this.Foto = file;
      
      // Usamos FileReader para obtener la URL del archivo
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.FotoTemporal = e.target.result; // Guardamos la URL generada en imageUrl
      };
      
      reader.readAsDataURL(file); // Cargamos el archivo y obtenemos su URL
    }
  }
  onFileSelectedConstancia(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      this.constancia = file;

      const formData = new FormData();

      // Agregar cada campo al FormData
      if (this.constancia && this.constancia?.size > 0) {
        formData.append('constancia', this.constancia);
      } 

      this.ProfileService.updateTaxData(formData, this.Id).subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.updateForm(res.data);
          this.TokenService.setUserData(res.data);
          this.loading = false;
          
          this.toastComponent.showToast(
            res.message,
            'bottom',
            'success',
            5000,
            true
          );
        },
        error: (error) => {
          console.error('Error fetching update data:', error);
          if(error.error.errors){
            console.error(error.errors);
            console.error("aqui estamos");
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
  }

}

