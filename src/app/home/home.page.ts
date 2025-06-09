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
import { ServiciosEmpresarialesService } from './services/servicios-empresariales.service';

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
  Servicios = <any>([]); 
  data : Info[] = [];
  data3 : CategoryCard[] = [];
  backgroudUrl : string = 'https://picsum.photos/id/100/1080/300';


  constructor(
    private homeService: HomeService,
    private ServiciosEmpresarialesService: ServiciosEmpresarialesService,
  ) {}

  ngOnInit(): void {

    this.loadData();
    this.loadServiciosEmpresariales();
  }

  loadData() {
    this.homeService.getAll().subscribe({
      next: (res: any) => {
        this.Data = res?.data?.[0] ? res.data[0] : [];

        if(this.Data?.preview){
          this.backgroudUrl = this.Data?.preview;
        }

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

  loadServiciosEmpresariales() {
    this.ServiciosEmpresarialesService.getAll().subscribe({
      next: (res: any) => {
        this.Servicios = res.data;


        this.Servicios.forEach((servicio: any) => {
          this.data3.push({
            id: servicio.id,
            productName: servicio.card_title,
            imgUrl: servicio.card_link_image,
          });
        });

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

  
}
