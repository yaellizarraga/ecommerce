import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from "../shared/components/banner-title/banner-title.component";
import { InfoComponent } from "../shared/components/info/info.component";
import { Info } from '../shared/interfaces/info.interface';
import { CategoryCard } from '../shared/interfaces/category-card.interfaces';
import { CategoryCardComponent } from '../shared/components/category-card/category-card.component';
import { CommonModule } from '@angular/common';
import { HomeService } from './services/home.service';

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
export class HomePage implements OnInit {
  

  Data = <any>([]); 
  data : Info[] = [];


  constructor(
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {
    this.homeService.getAll().subscribe({
      next: (res: any) => {
        this.Data = res.data[0];

        this.data = [
          {
            title: this.Data?.eslogan || 'Eslogan',
            description:'',
          },
          {
            title:this.Data?.info_title || 'Info Titulo',
            description:this.Data?.info_description || 'Info Descrición',
            colorBackground: 'var(--color-primary)',
            colorText:'var(--color-white)',
          },
      
        ];

      },
      error: (error) => {
        console.error('Error fetching home:', error);
      }
    });
  }


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
