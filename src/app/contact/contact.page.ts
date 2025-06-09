import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from "../shared/footer/footer.component";
import { BannerTitleComponent } from '../shared/components/banner-title/banner-title.component';
import { Info } from '../shared/interfaces/info.interface';
import { InfoComponent } from '../shared/components/info/info.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactService } from './services/contact.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FooterComponent,
    BannerTitleComponent,
    InfoComponent,
    ContactFormComponent,
    CommonModule,
  ],
})
export class ContactPage implements OnInit{

  Data = <any>([]); 
  data : Info[] = [];
  backgroudUrl : string = 'https://picsum.photos/id/200/1080/300';
  mapSrc: SafeResourceUrl | undefined;

  constructor(
        private ContactService: ContactService,
        private sanitizer: DomSanitizer
      ) {}
  
    ngOnInit(): void {
  
      this.loadData();
    }
  
    loadData() {
      this.ContactService.getAll().subscribe({
        next: (res: any) => {
          this.Data = res?.data?.[0] ? res.data[0] : [];

          if(this.Data?.preview){
            this.backgroudUrl = this.Data?.preview;
          }
          const number = this.Data?.contact_phone ? this.formatPhoneNumber(this.Data?.contact_phone) : '';
          
          const iframeString = this.Data?.contact_map_iframe; 
          if (iframeString) {
            const extractedSrc = this.extractSrcFromIframe(iframeString);
    
            if (extractedSrc) {
              this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(extractedSrc);
            } else {
              console.warn('No se encontró un src válido en el iframe.');
            }
          } else {
            console.warn('No se proporcionó un iframe.');
          }

          this.data = [
          {
            title: this.Data?.info_title || 'Título de Información',
            description: this.Data?.info_description || 'Descripción de Información',
          },
          {
            title: this.Data?.contact_title || 'Título de Contacto',
            description: this.Data?.contact_address ? this.Data.contact_address + `<br>¡Llámanos! ` + number : 'Dirección de Contacto',
          },
        ];
  
        },
        error: (error) => {
          console.error('Error fetching About Us:', error);
        }
      });
    }


  formatPhoneNumber(phone: string | number): string {
    if (!phone) return '';
  
    const cleaned = phone.toString().replace(/\D/g, ''); 
  
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
  
    return cleaned;
  }

  extractSrcFromIframe(iframeString: string): string | null {
    if (!iframeString.includes('<iframe')) {
      console.warn('El string proporcionado no contiene un iframe:', iframeString);
      return null;
    }
  
    const match = iframeString.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  }
  
  
}
