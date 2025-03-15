import { Component, inject, OnInit } from '@angular/core';
import { IonicModule, IonToast } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from './services/register.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastComponent,
  ],
})
export class RegisterPage {

  loading = false;
  Form: FormGroup;
  errors: any = [];
 
  private toastComponent = inject(ToastComponent);

  constructor(
    private fb: FormBuilder,
    private RegisterService:RegisterService,
    private router: Router,
    private TokenService: TokenService,

  ) {
     
     this.Form = this.fb.group({
       Nombre: ['', [Validators.required, Validators.maxLength(80)]],
       Apellido_Paterno: ['', [Validators.required, Validators.maxLength(40)]],
       Apellido_Materno: ['', [Validators.maxLength(40)]],
       Correo: ['', [Validators.required, Validators.email]],
       Clave: ['',[Validators.required , Validators.minLength(8),Validators.maxLength(40)]],
       Clave2: ['',[Validators.required , Validators.minLength(8),Validators.maxLength(40)]],
     });
   }

  clearError(field: string) {
    if (this.errors && this.errors[field]) {
      delete this.errors[field];
    }
  }

  
  async sendRegister(){
    this.loading = true;
    this.errors = [];

    const data = {
      Nombre: this.Form.value.Nombre,
      Apellido_Paterno: this.Form.value.Apellido_Paterno,
      Apellido_Materno: this.Form.value.Apellido_Materno,
      Correo: this.Form.value.Correo,
      Usuario: this.Form.value.Correo,
      Clave: this.Form.value.Clave,
      Clave2: this.Form.value.Clave2,
    };
    
    await this.RegisterService.create(data).subscribe({
      next: async(res: any) => {

        this.TokenService.setToken(true);
        
        const token = res.access_token.split('|')[1];
        const userData = {
          Id: res.data.Id_Persona,
          Nombre: res.data.Nombre,
          ApellidoPaterno: res.data.Apellido_Paterno,
          ApellidoMaterno: res.data.Apellido_Materno,
          NombreCompleto: res.data.Nombre + ' ' + res.data.Apellido_Paterno + (res.data.Apellido_Materno ? ' ' + res.data.Apellido_Materno : ''),
        };

        await localStorage.clear();
        await localStorage.setItem('token', token);
        await localStorage.setItem('userData', JSON.stringify(userData));

        this.toastComponent.showToast(
          '¡Registro exitoso! Se ha registrado correctamente.', 
          'bottom', 
          'success', 
          5000,
          true
        );
        
        this.Form.reset();
        this.loading = false;
        this.router.navigate(['all-products']);
      },
      error: (error: any) => {
        this.errors = error.error.errors;
        this.loading = false;
      }
    });


  }
  


}
