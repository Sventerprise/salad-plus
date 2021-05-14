import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { PayComponent } from './components/pay/pay.component';
import { PayTxResultComponent } from './components/pay-tx-result/pay-tx-result.component';

const routes: Routes = [
  {
    path: 'payment', component: PayComponent,
    children: [
      { path: 'pay', component: PaymentComponent },
      { path: 'post-pay', component: PayTxResultComponent },
      { path: '', redirectTo: 'pay', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PaymentRoutingModule { }


