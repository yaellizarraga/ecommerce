import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from '../menu/menu.component';
import { RouterModule } from '@angular/router';
import { HeaderService } from './services/header.service';
import { ValidUrlPipe } from '../pipes/validate-url.pipe';
import { addIcons } from 'ionicons';
import { cartOutline, logInOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    RouterModule,
    MenuComponent,
    ValidUrlPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{ 

  Data = <any>([]); 

  isOpen = false;
  
  

    @ViewChild('login') popover!: HTMLIonPopoverElement;

    constructor(
      private HeaderService: HeaderService,
    ) {
      addIcons({cartOutline, logInOutline, logOutOutline});
    }
      
    ngOnInit(): void {
  
      this.loadData();
    }
    loadData() {
      this.HeaderService.getAll().subscribe({
        next: (res: any) => {
          this.Data = res.data[0];
  
        },
        error: (error) => {
          console.error('Error fetching Header:', error);
        }
      });
    }

    openPopover(e: Event) {
      this.popover.event = e;
      this.isOpen = true;
    }
  
    closePopover() {
      this.isOpen = false;
    }

}
