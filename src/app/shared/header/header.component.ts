import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from '../menu/menu.component';
import { RouterModule } from '@angular/router';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    RouterModule,
    MenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{ 

  Data = <any>([]); 
  
    constructor(
      private HeaderService: HeaderService,
    ) {}
      
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
}
