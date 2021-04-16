import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-pay',
  templateUrl: './post-pay.component.html',
  styleUrls: ['./post-pay.component.scss']
})
export class PostPayComponent implements OnInit {
  items = [
    { qty: 1, description: "custom sandwich 1", price: 68.80, subtotal: 68.80 },
    { qty: 30, description: "Sourdough Ham Sandwich", price: 268.88, subtotal: 268.88 },
  ]
  paySuccessFlag: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
