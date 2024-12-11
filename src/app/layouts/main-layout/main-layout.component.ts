import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-main-layout.component',
  templateUrl: 'main-layout.component.html',
  styleUrls: ['main-layout.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
  ],
})
export class MainLayoutComponent {

 
  constructor() {}
}
