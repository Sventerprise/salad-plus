import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPayComponent } from './post-pay.component';

describe('PostPayComponent', () => {
  let component: PostPayComponent;
  let fixture: ComponentFixture<PostPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
