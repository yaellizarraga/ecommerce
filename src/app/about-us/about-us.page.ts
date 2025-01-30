import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from '../shared/components/banner-title/banner-title.component';
import { InfoTwoColumnsComponent } from '../shared/components/info-two-columns/info-two-columns.component';
import { InfoTwoColumns } from '../shared/interfaces/info-two-columns.interface';
import { AboutUsService } from './services/about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: 'about-us.page.html',
  styleUrls: ['about-us.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FooterComponent,
    BannerTitleComponent,
    InfoTwoColumnsComponent,
  ],
})
export class AboutUsPage implements OnInit {

  Data = <any>([]); 
  data : InfoTwoColumns[] = [];

  constructor(
      private AboutUsService: AboutUsService,
    ) {}

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {
    this.AboutUsService.getAll().subscribe({
      next: (res: any) => {
        this.Data = res.data[0];

        this.data = [
          {
          title:  this.Data?.mision_title || 'Titulo Mision',
          description: this.Data?.mision_description || 'Descripçion Mision',
          imgUrl: this.Data?.mision_link_image || 'Link imagen Mision',
          },
          {
          title: this.Data?.vision_title || 'Titulo Visión',
          description: this.Data?.vision_description || 'Descripçion Visión',
          imgUrl: this.Data?.vision_link_image || 'Link imagen Visión',
          },
          {
          title: this.Data?.values_title || 'Titulo Valores',
          description: this.Data?.values_description || 'Descripçion Valores',
          imgUrl: this.Data?.values_link_image || 'Link imagen Valores',
          },
        ];

      },
      error: (error) => {
        console.error('Error fetching About Us:', error);
      }
    });
  }


}
