import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './modules/order/order.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { PaymentModule } from './modules/payment/payment.module';
import { PostPayComponent } from './modules/payment/post-pay/post-pay.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'order', component: OrderComponent,
    loadChildren: () => import('./modules/order/order.module')
      .then(m => m.OrderModule)
  },

  {
    path: 'payment', component: PaymentModule,
    children: [
      { path: 'pay', component: PaymentModule },
      { path: 'post-pay', component: PostPayComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


