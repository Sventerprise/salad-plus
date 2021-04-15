import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SsselctorComponent } from './ssselctor/ssselctor.component';
import { BuilderComponent } from './builder/builder.component';
import { BuilderFormComponent } from './builder-form/builder-form.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { OrderRoutingModule } from './order-routing.module';
import { BuilderConfirmComponent } from './builder-confirm/builder-confirm.component';



@NgModule({
  declarations: [
    SsselctorComponent,
    BuilderComponent,
    BuilderFormComponent,
    IngredientListComponent,
    OrderListComponent,
    OrderFormComponent,
    SpecialtyComponent,
    OrderComponent,
    BuilderConfirmComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    RouterModule
  ]
})
export class OrderModule { }
