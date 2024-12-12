import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from "../shared/components/banner-title/banner-title.component";
import { InfoComponent } from "../shared/components/info/info.component";
import { Info } from '../shared/interfaces/info.interface';
import { CategoryCard } from '../shared/interfaces/category-card.interfaces';
import { CategoryCardComponent } from '../shared/components/category-card/category-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FooterComponent,
    BannerTitleComponent,
    InfoComponent,
    CategoryCardComponent,
  ],
})
export class HomePage {
  constructor() {}

  data : Info[] = [
    {
      title:'<h1><strong>Venta de equipos e insumos médicos para el cuidado de la salud</strong></h1>',
      description:'',
    },
    {
      title:'<h2><strong>Empresa dedicada al equipamiento médico</strong></h2>',
      description:`Somos una empresa dedicada a vender una extensa variedad de productos y 
      equipos para el cuidado de la salud. Nos preocupamos por satisfacer las necesidades 
      del cliente al distribuir mediante un extraordinario servicio de alta calidad y 
      productos del ramo médico de manera eficiente. Conoce nuestro lápiz para electrocirugía 
      desechable, así como nuestros equipos e insumos médicos`,
      colorBackground: 'var(--color-primary)',
      colorText:'var(--color-white)',
    },

  ];

  data2 : Info[] = [
    {
      title:"<h1><strong>Nos especializamos en</strong></h1>",
      description:'',
      colorBackground: 'transparent',
    },
  ];

  data3 : CategoryCard[] = [
    {
      id: 1,
      productName: 'Casa',
      imgUrl: 'assets/images/product-1.jpg',
    },
    {
      id: 2,
      productName: 'Oficina',
      imgUrl: 'assets/images/product-2.jpg',
    },
    {
      id: 3,
      productName: 'Departamento',
      imgUrl: 'assets/images/product-3.jpg',
    },
    {
      id: 1,
      productName: 'Salon de eventos',
      imgUrl: 'assets/images/product-4.jpg',
    },
    {
      id: 2,
      productName: 'Cabaña',
      imgUrl: 'assets/images/product-5.jpg',
    },
    {
      id: 3,
      productName: 'Hotel',
      imgUrl: 'assets/images/product-7.jpg',
    },
  ]
}
