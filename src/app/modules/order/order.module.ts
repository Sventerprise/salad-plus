import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SsselctorComponent } from './components/ssselctor/ssselctor.component';
import { BuilderComponent } from './components/builder/builder.component';
import { BuilderFormComponent } from './components/builder-form/builder-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { SpecialtyComponent } from './components/specialty/specialty.component';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { OrderRoutingModule } from './order-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromCart from './state/cart/cart.reducer';
import * as fromOrder from './state/order.reducer';
import * as fromStaticOrderData from '../../stores/reducers/order-static-data.reducer';
import { CartEffects } from './state/cart/cart.effects';
import { OrderEffects } from './state/order.effects';
import { OrderStaticDataEffects } from '../../stores/effects/order-static-data.effects';
import * as fromCurrentItem from './state/current-item/current-item.reducer';
import * as fromItemEdit from './state/item-edit/item-edit.reducer';
import * as fromOrderItems from './state/order-items/order-items.reducer';



@NgModule({
  declarations: [
    SsselctorComponent,
    BuilderComponent,
    BuilderFormComponent,
    OrderListComponent,
    OrderFormComponent,
    SpecialtyComponent,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    RouterModule,
    //#region Store
    EffectsModule.forFeature([CartEffects, OrderEffects, OrderStaticDataEffects]),
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
    StoreModule.forFeature(fromOrderItems.orderItemsFeatureKey, fromOrderItems.reducer),
    StoreModule.forFeature(fromOrder.orderFeatureKey, fromOrder.reducer),
    StoreModule.forFeature(fromStaticOrderData.orderStaticDataFeatureKey, fromStaticOrderData.reducer),
    StoreModule.forFeature(fromCurrentItem.currentItemFeatureKey, fromCurrentItem.reducer),
    StoreModule.forFeature(fromItemEdit.itemEditFeatureKey, fromItemEdit.reducer)
    //#endregion store
  ]
})
export class OrderModule { }
