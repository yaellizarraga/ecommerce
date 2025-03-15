import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './services/theme.service';
import { TokenService } from './auth/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp, 
    IonRouterOutlet,
  ],
})
export class AppComponent implements OnInit {
  
  constructor(
      private Theme: ThemeService,
      private Token: TokenService,
    ) {}
  
    async ngOnInit(): Promise<void> {
      await this.Token.checkToken();
      this.loadTheme();
    }
  
    loadTheme() {
      this.Theme.getAll().subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            const theme = res.data[0];
  
            // Establecer las variables CSS dinámicamente
            document.documentElement.style.setProperty('--color-primary', theme.primary_color || '#1a5276');
            document.documentElement.style.setProperty('--color-secondary', theme.secondary_color || '#3d8bbb');
            document.documentElement.style.setProperty('--font-family', theme.font_family || 'Arial, sans-serif');
          }
        },
        error: (error) => {
          console.error('Error fetching Header:', error);
        }
      });
    }

}
