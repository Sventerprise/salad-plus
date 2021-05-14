import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './components/payment/payment.component';
import { PayComponent } from './components/pay/pay.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromPayment from './state/payment.reducer'
import { StoreModule } from '@ngrx/store';
import { PaymentEffects } from './state/payment.effects';
import { EffectsModule } from '@ngrx/effects';
import { PayTxResultComponent } from './components/pay-tx-result/pay-tx-result.component';



@NgModule({
  declarations: [
    PaymentComponent,
    PayComponent,
    PayTxResultComponent
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
