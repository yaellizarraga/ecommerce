import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CategoryCard } from '../../interfaces/category-card.interfaces';
import { ValidUrlPipe } from '../../pipes/validate-url.pipe';

@Component({
  selector: 'app-shared-category-card',
  templateUrl: 'category-card.component.html',
  styleUrls: ['category-card.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ValidUrlPipe
  ],
})
export class CategoryCardComponent {
  
  item = input.required<CategoryCard>();

  constructor(private modalcontroller: ModalController) {}

  async openModalDetails(id:number){
    // const modal = await this.modalcontroller.create({
    //   component: ProductDetailsModalComponent,
    //   componentProps: {
    //     id: id,
    //   },
    //   cssClass:'custom-modal-class'
    // });

    // await modal.present();

    // const { data } = await modal.onWillDismiss();
    // console.log( data );
  }


}
