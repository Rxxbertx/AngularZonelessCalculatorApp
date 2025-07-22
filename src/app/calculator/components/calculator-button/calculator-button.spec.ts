import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CalculatorButton} from './calculator-button';


describe('Calculator Button', () => {
  let component: CalculatorButton;
  let fixture: ComponentFixture<CalculatorButton>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButton]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorButton);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 doubleSize is false', () => {

    const cssClasses = compiled.classList.value.split(" ");
    expect(cssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse()
  });
  it('should apply w-2/4 doubleSize is true', () => {

    //para set un input value en una prueba
    fixture.componentRef.setInput('isDoubleSize',true)
    const cssClasses = compiled.classList.value.split(" ");
    expect(cssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue()
  });
});
