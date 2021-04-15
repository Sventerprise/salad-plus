import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  categoryFlag: boolean = false
  selectorFlag: boolean = false
  confirmFlag: boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  addIngredients() {
    this.categoryFlag = true
  }

  categorySelected() {
    this.categoryFlag = false
    this.selectorFlag = true
  }

  public confirmCancel() {
    this.confirmFlag = true
  }

  public exitCancel() {
    this.confirmFlag = false
  }


}
