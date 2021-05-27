import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { OrderStaticData } from "../modules/order/models/OrderStaticData";

@Injectable({ providedIn: 'root' })
export class MockOrderStaticDataInterceptor implements HttpInterceptor {
  constructor(private store: Store<{}>) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url == 'https://localhost:3000/orderStaticData/') {
      const staticData = this.getOrderStaticDataData()
      const response = new HttpResponse({
        body: staticData
      })
      return of(response)
    }
    return next.handle(req)
  }


  public getOrderStaticDataData(): OrderStaticData {
    let data: OrderStaticData = {
      "specialties": [
        {
          "id": "ham_sourdough",
          "name": "Ham on Sourdough",
          "ingredients": ["ham", "sourdough", "cheddar"],
          "itemGroup": "sandwich",
          "img": "./assets/images/specialties/ham_sourdough.png",
          "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": null
        },
        {
          "id": "turkey_sandwich",
          "name": "Turkey on White",
          "ingredients": [
            "turkey",
            "kaiser_roll",
            "provolone",
            "mustard",
            "lettuce"
          ],
          "itemGroup": "sandwich",
          "img": "./assets/images/specialties/turkey_sandwich.png",
          "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": null
        },
        {
          "id": "cobb",
          "name": "Cobb Salad",
          "ingredients": [
            "ham",
            "turkey",
            "mixed_greens",
            "tomatoes",
            "cheddar",
            "cucumbers",
            "ranch"
          ],
          "itemGroup": "salad",
          "img": "./assets/images/specialties/cobb.png",
          "description": "This is some sample text describing a salad. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": null
        },
        {
          "id": "svens_salad",
          "name": "Sven's Salad",
          "ingredients": [
            "red_lettuce",
            "vinaigrette",
            "almonds",
            "cranberries",
            "ham"
          ],
          "itemGroup": "salad",
          "img": "./assets/images/specialties/svens_salad.png",
          "description": "This is some sample text describing a salad. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": null
        }
      ],
      "ingredients": [
        {
          "id": "ham",
          "name": "Ham",
          "image": ".assets/images/ingredients/ham.png",
          "itemGroup": "sal/sand",
          "type": "Meat"
        },
        {
          "id": "turkey",
          "name": "Turkey",
          "image": ".assets/images/ingredients/turkey.png",
          "itemGroup": "sal/sand",
          "type": "Meat"
        },
        {
          "id": "roast_beef",
          "name": "Roast Beef",
          "image": ".assets/images/ingredients/roast_beef.png",
          "itemGroup": "sandwich",
          "type": "Meat"
        },
        {
          "id": "red_lettuce",
          "name": "Red Lettuce",
          "image": ".assets/images/ingredients/red_lettuce.png",
          "itemGroup": "sal/sand",
          "type": "Greens"
        },
        {
          "id": "green_lettuce",
          "name": "Green Lettuce",
          "image": ".assets/images/ingredients/green_lettuce.png",
          "itemGroup": "sal/sand",
          "type": "Greens"
        },
        {
          "id": "mixed_greens",
          "name": "Mixed Greens",
          "image": ".assets/images/ingredients/mixed_greens.png",
          "itemGroup": "salad",
          "type": "Greens"
        },
        {
          "id": "lettuce",
          "name": "Lettuce",
          "image": ".assets/images/ingredients/lettuce.png",
          "itemGroup": "salad",
          "type": "Veggies"
        },
        {
          "id": "tomatoes",
          "name": "Tomatoes",
          "image": ".assets/images/ingredients/tomatoes.png",
          "itemGroup": "sal/sand",
          "type": "Veggies"
        },
        {
          "id": "pickles",
          "name": "Pickles",
          "image": ".assets/images/ingredients/Pickles.png",
          "itemGroup": "sandwich",
          "type": "Veggies"
        },
        {
          "id": "onions",
          "name": "Onions",
          "image": ".assets/images/ingredients/onions.png",
          "itemGroup": "sal/sand",
          "type": "Veggies"
        },
        {
          "id": "cucumbers",
          "name": "Cucumbers",
          "image": ".assets/images/ingredients/cucumbers.png",
          "itemGroup": "salad",
          "type": "Veggies"
        },
        {
          "id": "cheddar",
          "name": "Cheddar",
          "image": ".assets/images/ingredients/cheddar.png",
          "itemGroup": "sal/sand",
          "type": "Cheese"
        },
        {
          "id": "provolone",
          "name": "Provolone",
          "image": ".assets/images/ingredients/provolone.png",
          "itemGroup": "sandwich",
          "type": "Cheese"
        },
        {
          "id": "blue_cheese",
          "name": "Blue Cheese",
          "image": ".assets/images/ingredients/blue_cheese.png",
          "itemGroup": "salad",
          "type": "Cheese"
        },
        {
          "id": "sourdough",
          "name": "Sourdough",
          "image": ".assets/images/ingredients/sourdough.png",
          "itemGroup": "sandwich",
          "type": "Bread"
        },
        {
          "id": "kaiser_roll",
          "name": "Kaiser Roll",
          "image": ".assets/images/ingredients/kaiser_roll.png",
          "itemGroup": "sandwich",
          "type": "Bread"
        },
        {
          "id": "mustard",
          "name": "Mustard",
          "image": ".assets/images/ingredients/mustard.png",
          "itemGroup": "sandwich",
          "type": "Condiments"
        },
        {
          "id": "mayo",
          "name": "Mayo",
          "image": ".assets/images/ingredients/mayo.png",
          "itemGroup": "sandwich",
          "type": "Condiments"
        },
        {
          "id": "ranch",
          "name": "Ranch",
          "image": ".assets/images/ingredients/ranch.png",
          "itemGroup": "salad",
          "type": "Dressings"
        },
        {
          "id": "almonds",
          "name": "Almonds",
          "image": ".assets/images/ingredients/almonds.png",
          "itemGroup": "salad",
          "type": "Nuts/Fruit"
        },
        {
          "id": "cranberries",
          "name": "Cranberries",
          "image": ".assets/images/ingredients/cranberries.png",
          "itemGroup": "salad",
          "type": "Nuts/Fruit"
        },
        {
          "id": "vinaigrette",
          "name": "Vinaigrette",
          "image": ".assets/images/ingredients/vinaigrette.png",
          "itemGroup": "salad",
          "type": "Dressings"
        }
      ],
      "ingredientTypes": {
        "Condiments": {
          "selectType": "multiple",
          "price": "0.25"
        },
        "Bread": {
          "selectType": "single",
          "price": "3.00"
        },
        "Cheese": {
          "selectType": "multiple",
          "price": "2.00"
        },
        "Meat": {
          "selectType": "multiple",
          "price": "3.20"
        },
        "Veggies": {
          "selectType": "multiple",
          "price": "1.70"
        },
        "Greens": {
          "selectType": "single",
          "price": "2.80"
        },
        "Dressings": {
          "selectType": "multiple",
          "price": "1.50"
        },
        "Nuts/Fruit": {
          "selectType": "multiple",
          "price": "2.20"
        }
      },
      "desserts": [],
      "drinks": [],
      "sides": []
    }
    return data
  }
}

