import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayComponent } from './pay/pay.component';
import { PostPayComponent } from './post-pay/post-pay.component';



@NgModule({
  declarations: [
    PayComponent,
    PostPayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentModule { }
