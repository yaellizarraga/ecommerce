import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { MenuComponent } from '../menu/menu.component';
import { RouterModule } from '@angular/router';
import { ValidUrlPipe } from '../pipes/validate-url.pipe';
import { addIcons } from 'ionicons';
import { cartOutline, close, logInOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-shared-header-modal',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    ValidUrlPipe,
  ],
  templateUrl: './header-modal.component.html',
  styleUrl: './header-modal.component.scss',
})
export class HeaderModalComponent {

  linkLogo = input.required<string>();
  title = input.required<string>();

  constructor(private modalController: ModalController) {
    addIcons({ close });
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
