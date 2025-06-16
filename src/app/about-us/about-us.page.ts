import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from '../shared/components/banner-title/banner-title.component';
import { InfoTwoColumnsComponent } from '../shared/components/info-two-columns/info-two-columns.component';
import { InfoTwoColumns } from '../shared/interfaces/info-two-columns.interface';
import { AboutUsService } from './services/about-us.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  data: InfoTwoColumns[] = [];
  backgroudUrl: string = 'https://picsum.photos/id/300/1080/300';
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private AboutUsService: AboutUsService,
  ) { }

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {
    this.AboutUsService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.Data = res?.data?.[0] ? res.data[0] : [];

        if (this.Data?.link_banner) {
          this.backgroudUrl = this.Data?.preview;
        }

        this.data = [
          {
            title: this.Data?.mision_title || 'Titulo Misión',
            description: this.Data?.mision_description || 'Descripción Mision',
            imgUrl: this.Data?.preview_misionLinkImage || 'https://picsum.photos/id/1/500/500',
          },
          {
            title: this.Data?.vision_title || 'Titulo Visión',
            description: this.Data?.vision_description || 'Descripción Visión',
            imgUrl: this.Data?.preview_visionLinkImage || 'https://picsum.photos/id/2/500/500',
          },
          {
            title: this.Data?.values_title || 'Titulo Valores',
            description: this.Data?.values_description || 'Descripción Valores',
            imgUrl: this.Data?.preview_valuesLinkImage || 'https://picsum.photos/id/3/500/500',
          },
        ];

      },
      error: (error) => {
        console.error('Error fetching About Us:', error);
      }
    });
  }


}
