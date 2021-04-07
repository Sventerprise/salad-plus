import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsselctorComponent } from './ssselctor.component';

describe('SsselctorComponent', () => {
  let component: SsselctorComponent;
  let fixture: ComponentFixture<SsselctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsselctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SsselctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
