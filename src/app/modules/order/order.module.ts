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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromCart from '../../stores/reducers/cart.reducer';
import * as fromOrder from '../../stores/reducers/order.reducer';
import * as fromStaticOrderData from '../../stores/reducers/static-order-data.reducer';
import { CartEffects } from '../../stores/effects/cart.effects';
import { OrderEffects } from '../../stores/effects/order.effects';
import { StaticOrderDataEffects } from '../../stores/effects/static-order-data.effects';



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
    RouterModule,
    //#region Store
    EffectsModule.forFeature([CartEffects, OrderEffects, StaticOrderDataEffects]),
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
    StoreModule.forFeature(fromOrder.orderFeatureKey, fromOrder.reducer),
    StoreModule.forFeature(fromStaticOrderData.staticOrderDataFeatureKey, fromStaticOrderData.reducer)
    //#endregion store
  ]
})
export class OrderModule { }
