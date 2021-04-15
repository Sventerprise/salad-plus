import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderConfirmComponent } from './builder-confirm.component';

describe('BuilderConfirmComponent', () => {
  let component: BuilderConfirmComponent;
  let fixture: ComponentFixture<BuilderConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
