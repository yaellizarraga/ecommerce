import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenService } from '../auth/services/token.service';
import { ProfileService } from './services/profile.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  loadingProfile = false;
  loading = false;
  token = false;
  UserData: any = {};

  Form: FormGroup;
  errors: any = [];

   constructor(
    private TokenService: TokenService,
    private ProfileService: ProfileService,
    private fb: FormBuilder,
   ) {

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
      Clave: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      Clave2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      
      RFC: ['', [Validators.maxLength(150)]],
      Giro: ['', [Validators.pattern('^[0-9]*$')]], // Solo números
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

  async sendProfile(){
    this.loading = true;
    this.errors = [];
    
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }

  async loadProfile(){
      let id = this.UserData?.Id;
      console.log(id);
       this.ProfileService.getById(id).subscribe({
        next: (res: any) => {
          console.log(res.data);
          
          this.Form.patchValue({
            Nombre: res?.data?.Nombre || '',
            Apellido_Paterno: res?.data?.Apellido_Paterno || '',
            Apellido_Materno: res?.data?.Apellido_Materno || '',
            RFC: res?.data?.RFC || '',
            Giro: res?.data?.Giro || 0,
            Telefono: res?.data?.Telefono || '',
            Celular: res?.data?.Celular || '',
            Correo: res?.data?.Correo || '',
            Usuario: res?.data?.Usuario || '',
            Clave: res?.data?.Clave || '',
            Whatsapp: res?.data?.Whatsapp || '',
            Foto: res?.data?.Foto || '',
            razonsocial: res?.data?.razonsocial || '',
            regimenfiscal: res?.data?.regimenfiscal || '',
            codigopostalcliente: res?.data?.codigopostalcliente || '',
            usocfdi: res?.data?.usocfdi || '',
            constancia: res?.data?.constancia || null,
          });

          this.loadingProfile = true;
        },
        error: (error) => {
          console.error('Error fetching get data:', error);
          this.loadingProfile = true;
        }
      });
  }
}

