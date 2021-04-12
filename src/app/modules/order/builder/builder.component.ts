import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  // addIngredients() {
  //   this.router.navigate('ingredient-list'
  //     // [{ outlets: { ingredientList: ['ingredient-list'] } }]
  //     )
  // }

}
