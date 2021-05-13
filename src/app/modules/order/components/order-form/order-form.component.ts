import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem, OrderItemDetailed } from '../../models/Item';
import { removeCartItem } from '../../state/cart/cart.actions';
import { State } from '../../state/cart/cart.reducer';
import { selectCartItemArray, selectCartItemsWithIngredientInfo, selectCartState } from '../../state/cart/cart.selectors';
import { loadItemToBuilder } from '../../state/current-item/current-item.actions';
import { toggleDetail, updateQuantityAndSubtotal } from '../../state/order-items/order-items.actions';
import { selectOrderItemEntities, selectOrderItemNames } from '../../state/order-items/order-items.selectors';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  items$: Observable<OrderItemDetailed[]>
  ingredientsByName$: Observable<{ [key: string]: string[] }>
  // items: { [key: string]: string[] }

  constructor(
    private store: Store<{}>,
    private cartService: CartService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.items$ = this.store.select(selectCartItemsWithIngredientInfo)
    this.ingredientsByName$ = this.store.select(selectOrderItemNames)
    // this.ingredientsByName$.subscribe(items =>
    //   this.items = items
    // )
  }

  public toggleDetail(id: string): void {
    this.store.dispatch(toggleDetail({ id }))
  }

  public removeCartItem(id: string): void {
    this.cartService.removeCartItem(id)
    this.cartService.removeOrderItem(id)
  }

  public updateQuantityAndSubtotal(e: any, id: string): void {
    let quantity = e.value
    this.store.dispatch(updateQuantityAndSubtotal({ quantity, id }))
    this.cartService.updateTotal()
  }

  public editItem(id: string): void {
    this.store.select(selectOrderItemEntities).subscribe(entities =>
      this.store.dispatch(loadItemToBuilder({ orderItem: entities[id] }))
    )
    this.cartService.removeCartItem(id)
    this.router.navigate(['order/builder'])
  }

}
