import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { RouterModule } from '@angular/router';
import { HeaderModalComponent } from 'src/app/shared/header-modal/header-modal.component';
import { HeaderService } from 'src/app/shared/header/services/header.service';
import { addIcons } from 'ionicons';
import { checkmarkCircle, ellipse, ellipseOutline, time } from 'ionicons/icons';

@Component({
  selector: 'app-order-status-modal',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HeaderModalComponent
  ],
  templateUrl: './status-modal.component.html',
  styleUrl: './status-modal.component.scss',
})
export class StatusModalComponent implements OnInit {

  link_logo = '';
  card: any;
  loading = false;

  constructor(
    private HeaderService: HeaderService,
    private modalcontroller: ModalController,
  ) { 
    addIcons({checkmarkCircle ,time ,ellipse});
  }

  ngOnInit() {
    this.loadHeader();
  }

  loadHeader() {
    this.HeaderService.getAll().subscribe({
      next: (res: any) => {
        this.link_logo = (res.data.length > 0) ? res.data[0].preview : '';
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  closeModal() {
    this.modalcontroller.dismiss();
  }

}
