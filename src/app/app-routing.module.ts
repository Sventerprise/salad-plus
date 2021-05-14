import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './modules/order/order.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { PayComponent } from './modules/payment/components/pay/pay.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'order', component: OrderComponent,
    loadChildren: () => import('./modules/order/order.module')
      .then(m => m.OrderModule)
  },
  {
    path: 'pay', component: PayComponent,
    loadChildren: () => import('./modules/payment/payment.module')
      .then(m => m.PaymentModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


