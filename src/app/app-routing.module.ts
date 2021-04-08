import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './modules/order/builder/builder.component';
import { OrderListComponent } from './modules/order/order-list/order-list.component';
import { SpecialtyComponent } from './modules/order/specialty/specialty.component';
import { SsselctorComponent } from './modules/order/ssselctor/ssselctor.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { PaymentModule } from './modules/payment/payment.module';
import { PostPayComponent } from './modules/payment/post-pay/post-pay.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'order', component: SsselctorComponent,
    children: [
      { path: 'specialty', component: SpecialtyComponent },
      { path: 'builder', component: BuilderComponent },
      { path: 'my-items', component: OrderListComponent }
    ]
  },

  {
    path: 'payment', component: PaymentModule,
    children: [
      { path: 'pay', component: PaymentModule },
      { path: 'post-pay', component: PostPayComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


