import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { FooterService } from './services/footer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {

  Data = <any>([]);

  private readonly destroyRef = inject(DestroyRef);
  
  constructor(
    private FooterService: FooterService,
  ) { }

  ngOnInit(): void {

    this.loadData();
  }
  loadData() {
    this.FooterService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.Data = res?.data?.[0] ? res.data[0] : [];

      },
      error: (error) => {
        console.error('Error fetching Footer:', error);
      }
    });
  }

}
