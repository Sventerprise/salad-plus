import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayComponent } from './components/pay/pay.component';
import { PostPayComponent } from './components/post-pay/post-pay.component';
import { PaymentComponent } from './components/core/payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromPayment from './state/payment.reducer'
import { StoreModule } from '@ngrx/store';
import { PaymentEffects } from './state/payment.effects';
import { EffectsModule } from '@ngrx/effects';



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
    EffectsModule.forFeature([PaymentEffects]),
    StoreModule.forFeature(fromPayment.paymentFeatureKey, fromPayment.reducer),
  ]
})
export class PaymentModule { }
