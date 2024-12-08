import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from '../shared/components/banner-title/banner-title.component';
import { InfoTwoColumnsComponent } from '../shared/components/info-two-columns/info-two-columns.component';
import { InfoTwoColumns } from '../shared/interfaces/info-two-columns.interface';

@Component({
  selector: 'app-about-us',
  templateUrl: 'about-us.page.html',
  styleUrls: ['about-us.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    FooterComponent,
    BannerTitleComponent,
    InfoTwoColumnsComponent,
  ],
})
export class AboutUsPage {

  data : InfoTwoColumns[] = [
    {
    title: 'Misión',
    description: 'Ser, más que una empresa, un aliado estratégico para nuestros clientes en la venta y distribución de productos para el cuidado de la salud.',
    imgUrl: 'https://www.veropreviale.com/wp-content/uploads/2023/02/mision-vision-y-valores.svg',
    },
    {
    title: 'Visión',
    description: 'Convertirnos en una empresa líder en el mercado, capaces de cubrir todas las necesidades de nuestros clientes, con la mejor tecnología y calidad de nuestros productos ',
    imgUrl: 'https://www.veropreviale.com/wp-content/uploads/2023/02/mision-vision-y-valores.svg',
    },
    {
    title: 'Valores',
    description: `<ul>
      <li>Vocación</li>
      <li>Pasión</li>
      <li>Compromiso</li>
      <li>Honestidad</li>
    </ul>`,
    imgUrl: 'https://www.veropreviale.com/wp-content/uploads/2023/02/mision-vision-y-valores.svg',
    },
  ];
  constructor() {}
}
