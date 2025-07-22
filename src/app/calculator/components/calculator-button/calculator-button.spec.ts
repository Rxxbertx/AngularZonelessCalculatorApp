import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CalculatorButton} from './calculator-button';
import {Component} from '@angular/core';

@Component({
  imports:[CalculatorButton],
  template:`
    <calculator-button><span class="projected-content underline">Test</span></calculator-button>
  `,
})
class TestHostComponent {
}


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
    fixture.componentRef.setInput('isDoubleSize', true)
    fixture.detectChanges()
    const cssClasses = compiled.classList.value.split(" ");
    expect(cssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue()
  });

  it('should emit onClick when handleClick is called', () => {

    //spy

    spyOn(component.onClick, 'emit')

    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();

  });
  it('should set isPressed to true and then false when keyboardPressStyle', (done) => {

    component.contentValue()!.nativeElement.innerText = '1'

    //simular el teclado
    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done()
    }, 101)

  });
  it('should not set isPressed to true and then false when keyboardPressStyle key dont match', () => {

    component.contentValue()!.nativeElement.innerText = '1'

    //simular el teclado
    component.keyboardPressedStyle('2');

    expect(component.isPressed()).toBeFalse();

  });

  it('should have projected content', () => {

    const testFixture = TestBed.createComponent(TestHostComponent);
    const testCompiled = testFixture.nativeElement as HTMLElement;
    testFixture.detectChanges();

    const projectedContent = testCompiled.querySelector('.projected-content');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent?.textContent).toContain('Test');

  });

});
