import { CommonModule } from '@angular/common';
import { Component, Injectable, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-shared-toast',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class ToastComponent {

  constructor(private ToastController: ToastController) {}

  async showToast(
    message: string,
    position: 'top' | 'middle' | 'bottom' = 'top',
    color: string = 'success',
    duration?: number, 
    showButton: boolean = false
  ) {
    const toastOptions: any = {
      message,
      position,
      color,
      cssClass: 'custom-toast'
    };
  
    if (duration) {
      toastOptions.duration = duration;
    }
  
    if (showButton) {
      toastOptions.buttons = [
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
            console.log('Toast cerrado');
          }
        }
      ];
    }
  
    const toast = await this.ToastController.create(toastOptions);
    await toast.present();
  }
  

}
