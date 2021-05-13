import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayComponent } from './components/pay/pay.component';
import { PaymentComponent } from './payment.component';
import { PostPayComponent } from './components/post-pay/post-pay.component';

const routes: Routes = [
  {
    path: 'payment', component: PaymentComponent,
    children: [
      { path: 'pay', component: PayComponent },
      { path: 'post-pay', component: PostPayComponent },
      { path: '', redirectTo: 'pay', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PaymentRoutingModule { }


