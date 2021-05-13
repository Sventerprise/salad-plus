import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyComponent } from '../specialty/specialty.component';

describe('SpecialtyComponent', () => {
  let component: SpecialtyComponent;
  let fixture: ComponentFixture<SpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialtyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an h3 with "ham"', () => {
    const specialtyElement: HTMLElement = fixture.nativeElement
    const h3 = specialtyElement.querySelector('h3')
    expect(h3?.textContent).toContain('Ham')
  });

  it('should render an image with the class "fill"'), () => {
    const specialtyElement: HTMLElement = fixture.nativeElement
    const img = specialtyElement.querySelector('img')
    expect(img?.className).toEqual('file')
  }

  it('should not have any "bord-x" classes'), () => {
    const specialtyElement: HTMLElement = fixture.nativeElement
    const anyEl = specialtyElement.querySelector('*')
    expect(anyEl?.className).not.toContain('bord-')
  }
});
