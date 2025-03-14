import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.page.html',
  styleUrls: ['shopping-cart.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
  ],
})
export class ShoppingCartPage implements OnInit {

  loading = false;
 
   constructor() {
   }

  ngOnInit(): void {
    console.log("shopping");
  }



}
