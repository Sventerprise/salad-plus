import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuilderConfirmComponent } from "./builder-confirm/builder-confirm.component";
import { BuilderComponent } from "./builder/builder.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderComponent } from "./order.component";
import { SpecialtyComponent } from "./specialty/specialty.component";
import { SsselctorComponent } from "./ssselctor/ssselctor.component";

const routes: Routes = [
  {
    path: 'order', component: OrderComponent,
    children: [
      { path: 'ss-selector', component: SsselctorComponent },
      { path: 'specialty', component: SpecialtyComponent },
      {
        path: 'builder', component: BuilderComponent,
        children: [
          {
            path: 'confirm-cancel', component: BuilderConfirmComponent, outlet: 'confirmCancel'
          }
        ]
      },
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
