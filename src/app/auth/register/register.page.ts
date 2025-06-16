import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IonicModule, IonToast } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from './services/register.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { TokenService } from '../services/token.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private RegisterService: RegisterService,
    private router: Router,
    private TokenService: TokenService,

  ) {

    this.Form = this.fb.group({
      Nombre: ['', [Validators.required, Validators.maxLength(80)]],
      Apellido_Paterno: ['', [Validators.required, Validators.maxLength(40)]],
      Apellido_Materno: ['', [Validators.maxLength(40)]],
      Correo: ['', [Validators.required, Validators.email]],
      Clave: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      Clave2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
    });
  }

  clearError(field: string) {
    if (this.errors && this.errors[field]) {
      delete this.errors[field];
    }
  }


  async sendRegister() {
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

    await this.RegisterService.create(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: async (res: any) => {

        this.TokenService.setToken(true);

        const token = res.access_token.split('|')[1];

        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        await this.TokenService.setUserData(res.data);
        await localStorage.setItem('token', token);

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
