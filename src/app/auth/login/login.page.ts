import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { TokenService } from '../services/token.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginPage {

  loading = false;
  Form: FormGroup;
  errors: any = [];

  private toastComponent = inject(ToastComponent);

   constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private router: Router,
    private TokenService: TokenService,
    ) {
     
     this.Form = this.fb.group({
      Correo: ['', [Validators.required, Validators.email]],
      Clave: ['',[Validators.required , Validators.minLength(8),Validators.maxLength(40)]],
     });
   }

 

  clearError(field: string) {
    if (this.errors && this.errors[field]) {
      delete this.errors[field];
    }
  }

  async sendLogin(){
    this.loading = true;
    this.errors = [];

    const data = {
      Correo: this.Form.value.Correo,
      Clave: this.Form.value.Clave,
    };

    await this.LoginService.create(data).subscribe({
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
        this.TokenService.setUserData(userData);
        await localStorage.clear();
        await localStorage.setItem('token', token);
        await localStorage.setItem('userData', JSON.stringify(userData));

        this.toastComponent.showToast(
          '¡Bienvenido! ' + userData.NombreCompleto, 
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

        if(this.errors.Toast){
          this.toastComponent.showToast(
            this.errors.Toast[0], 
            'bottom', 
            'danger', 
            5000,
            true
          );
        }
      }
    });

  }
  


}
