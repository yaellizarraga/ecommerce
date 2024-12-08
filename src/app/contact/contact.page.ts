import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from '../shared/components/banner-title/banner-title.component';
import { Info } from '../shared/interfaces/info.interface';
import { InfoComponent } from '../shared/components/info/info.component';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    FooterComponent,
    BannerTitleComponent,
    InfoComponent,
  ],
})
export class ContactPage {

  data : Info[] = [
    {
      title:'O, aún mejor, ¡ven a visitarnos!',
      description:'Nos encanta recibir a nuestros clientes, así que ven en cualquier momento durante las horas de oficina.',
    },
    {
      title:'E-COMMERCE',
      description:`Av. de la Marina 6204, Colonia Desarrollo, Marina Mazatlán, 82103 Mazatlán, Sin.<br>
¡Llámanos! (669) 281-5526`,
    },
  ];
  constructor() {}
}
