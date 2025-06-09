import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-shared-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class AlertComponent {

  constructor(private alertController: AlertController) { }

  async simpleAlert(title: string, message: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const simpleAlert = await this.alertController.create({
        header: title,
        message: message,
        mode: 'ios',
        buttons: [
          {
            text: 'Cancelar',
            role: 'Cancelar',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Aceptar',
            role: 'Aceptar',
            handler: () => {
              resolve(true);
            }
          }
        ],
      });

      await simpleAlert.present();

      const alertMessageEl = document.querySelector('.alert-message');
      if (alertMessageEl) {
        alertMessageEl.innerHTML = message;
      }

    });
  }
}
