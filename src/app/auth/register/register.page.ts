import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class RegisterPage implements OnInit {

  loading = false;
  Form: FormGroup;
 
   constructor(private fb: FormBuilder) {
     
     this.Form = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['',[Validators.required , Validators.minLength(8)]],
       password2: ['',[Validators.required , Validators.minLength(8)]],
     });
   }

  ngOnInit(): void {
    console.log("Register");
  }

  sendRegister(){
    this.loading = true;
    const data = {
      email: this.Form.value.email,
      password: this.Form.value.password,
    };

    console.log(data);

    setTimeout(()=>{
      this.loading = false;
    },3000)

  }
  


}
