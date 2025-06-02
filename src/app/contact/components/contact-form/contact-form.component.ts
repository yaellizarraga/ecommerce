import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact-form',
  templateUrl: 'contact-form.component.html',
  styleUrls: ['contact-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule, 
  ],
})
export class ContactFormComponent {
  emailForm: FormGroup;

  constructor(private fb: FormBuilder) {
    
    this.emailForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      tieneWhatsapp: [false],
      interes: ['', [Validators.required]],
    });
  }

  sendEmail() {
    const templateParams = {
      nombre: this.emailForm.value.nombre,
      email: this.emailForm.value.email,
      telefono: this.emailForm.value.telefono,
      tieneWhatsapp: this.emailForm.value.tieneWhatsapp ? 'Sí' : 'No',
      interes: this.emailForm.value.interes,
    };

    emailjs.send(environment.ServiceID, environment.Template, templateParams,{ publicKey: environment.publicKey,})
    .then(
      () => {
        console.log('El correo se envio correctamente!');
      },
      (error) => {
        console.log('Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.', (error as EmailJSResponseStatus).text);
      },
    );

  }

}
