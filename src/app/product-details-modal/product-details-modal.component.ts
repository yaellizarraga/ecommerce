import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { product } from 'src/app/all-products/interfaces/product.interfaces';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: 'product-details-modal.component.html',
  styleUrls: ['product-details-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsModalComponent implements AfterViewInit {
  
  product = {
    name: 'Oficina Profesional',
    price: 1500,
    discountPrice: 1200,
    description: `<section>
  <h1>Características de una Oficina Profesional</h1>
  <p>
    Una oficina profesional es un espacio diseñado para el desempeño eficiente de actividades laborales, administrativas o empresariales. Combina funcionalidad y estética para proyectar una imagen profesional, garantizando comodidad y productividad.
  </p>
    <br>
  <h2>Características principales:</h2>
   <br>
  <ul>
    <li>
      <strong>Distribución funcional:</strong>
      <ul>
        <li>Recepción o sala de espera.</li>
        <li>Espacios individuales (cubículos o escritorios).</li>
        <li>Áreas comunes para reuniones o trabajo colaborativo.</li>
        <li>Sala de juntas con equipos tecnológicos para presentaciones.</li>
        <li>Zona de descanso o cafetería.</li>
      </ul>
    </li>
    <li>
     <br>
      <strong>Equipamiento tecnológico:</strong>
      <ul>
        <li>Computadoras y accesorios.</li>
        <li>Impresoras y proyectores.</li>
        <li>Sistemas de videoconferencia.</li>
        <li>Conexión Wi-Fi de alta velocidad.</li>
      </ul>
    </li>
   
</section>
`,
    images: [
      'assets/images/product-10.jpg',
      'assets/images/product-10.jpg',
      'assets/images/product-10.jpg',
      'assets/images/product-10.jpg',
      'assets/images/product-10.jpg',
      'assets/images/product-10.jpg',
      'assets/images/product-10.jpg',
    ],
  };

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  ngAfterViewInit() {
    const swiperEl = this.swiperContainer.nativeElement;

    const swiperParams = {
      autoplay: {
        delay: 2000, 
        disableOnInteraction: false, 
      },
      pagination: true,
      navigation: true,
    };
  
    Object.assign(swiperEl, swiperParams);
  
    swiperEl.initialize();
  }

  addToCart() {
    
  }

  buyNow() {
    
  }

}
