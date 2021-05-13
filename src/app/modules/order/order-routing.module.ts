import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuilderComponent } from "./components/builder/builder.component";
import { OrderListComponent } from "./components/order-list/order-list.component";
import { OrderComponent } from "./order.component";
import { SpecialtyComponent } from "./components/specialty/specialty.component";
import { SsselctorComponent } from "./components/ssselctor/ssselctor.component";

const routes: Routes = [
  {
    path: 'order', component: OrderComponent,
    children: [
      { path: 'ss-selector', component: SsselctorComponent },
      { path: 'specialty', component: SpecialtyComponent },
      { path: 'builder', component: BuilderComponent },
      { path: 'order-list', component: OrderListComponent },
      { path: '', redirectTo: 'ss-selector', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderRoutingModule { }
