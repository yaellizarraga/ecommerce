import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private urlBackend: string = environment.apiUrl + '/filters';
  private http = inject(HttpClient);
  private filtroData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() {}

  getFiltros(): Observable<any> {
    return this.filtroData.asObservable();
  }

  setFiltros(value: any): void {
    this.filtroData.next(value);
  }

  getFilters(): { [key: string]: string[] } {
    return this.filtroData.getValue();
  }

  addFilter(value: string, tipo: string): void {
    tipo = tipo.trim().replace(/\s+/g, '');
    const currentFilters = this.getFilters();

    if (!currentFilters[tipo]) {
      currentFilters[tipo] = [];
    }

    if (!currentFilters[tipo].includes(value)) {
      currentFilters[tipo].push(value);
      this.filtroData.next({ ...currentFilters }); 
    }
  }

  deleteFilter(item: string, tipo: string): void {
    const currentFilters = this.getFilters();

    if (currentFilters[tipo]) {
      currentFilters[tipo] = currentFilters[tipo].filter(f => f !== item);

      if (currentFilters[tipo].length === 0) {
        delete currentFilters[tipo];
      }

      this.filtroData.next({ ...currentFilters }); 
    }
  }

  deleteFilterAll(): void {
    this.filtroData.next({}); 
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.urlBackend}`);
  }

}
