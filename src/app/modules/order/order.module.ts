import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SsselctorComponent } from './ssselctor/ssselctor.component';
import { BuilderComponent } from './builder/builder.component';
import { BuilderFormComponent } from './builder-form/builder-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { OrderRoutingModule } from './order-routing.module';
import { BuilderConfirmComponent } from './builder-confirm/builder-confirm.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromCart from './state/cart/cart.reducer';
import * as fromOrder from '../../stores/reducers/order.reducer';
import * as fromStaticOrderData from '../../stores/reducers/order-static-data.reducer';
import { CartEffects } from './state/cart/cart.effects';
import { OrderEffects } from '../../stores/effects/order.effects';
import { OrderStaticDataEffects } from '../../stores/effects/order-static-data.effects';
import * as fromCurrentItem from './state/current-item/current-item.reducer';
import * as fromItemEdit from './state/item-edit/item-edit.reducer';



@NgModule({
  declarations: [
    SsselctorComponent,
    BuilderComponent,
    BuilderFormComponent,
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
    EffectsModule.forFeature([CartEffects, OrderEffects, OrderStaticDataEffects]),
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
    StoreModule.forFeature(fromOrder.orderFeatureKey, fromOrder.reducer),
    StoreModule.forFeature(fromStaticOrderData.orderStaticDataFeatureKey, fromStaticOrderData.reducer),
    StoreModule.forFeature(fromCurrentItem.currentItemFeatureKey, fromCurrentItem.reducer),
    StoreModule.forFeature(fromItemEdit.itemEditFeatureKey, fromItemEdit.reducer)
    //#endregion store
  ]
})
export class OrderModule { }
