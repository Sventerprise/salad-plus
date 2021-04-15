import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayComponent } from './pay/pay.component';
import { PostPayComponent } from './post-pay/post-pay.component';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';



@NgModule({
  declarations: [
    PayComponent,
    PostPayComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
