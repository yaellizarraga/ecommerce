import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class HomePage {
  constructor() {}
}
