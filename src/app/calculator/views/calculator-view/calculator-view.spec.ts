import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorView } from './calculator-view';

describe('CalculatorView', () => {
  let component: CalculatorView;
  let fixture: ComponentFixture<CalculatorView>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorView);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {

    expect(compiled.querySelector('calculator')).not.toBeNull();

  });

  it('should contain contain basis css classes', () => {

    const divElement = compiled.querySelector('div')
    const divElementCssClasses = divElement?.classList.value.split(" ")
    const shouldHaveCssClasses = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(" ")

    shouldHaveCssClasses.forEach((className)=>{

      expect(divElementCssClasses).toContain(className)

    })

  });


});
