import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from "../shared/components/banner-title/banner-title.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    FooterComponent,
    BannerTitleComponent
],
})
export class HomePage {
  constructor() {}
}
