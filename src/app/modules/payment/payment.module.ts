import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayComponent } from './pay/pay.component';
import { PostPayComponent } from './post-pay/post-pay.component';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromPayment from './state/payment.reducer'
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    PayComponent,
    PostPayComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromPayment.paymentFeatureKey, fromPayment.reducer),
  ]
})
export class PaymentModule { }
