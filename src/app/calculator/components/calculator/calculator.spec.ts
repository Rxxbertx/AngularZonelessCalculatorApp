import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculator } from './calculator';
import {CalculatorService} from '../../services/calculator.service';


class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');
  public constructNumber = jasmine.createSpy('constructNumber')
}

describe('Calculator', () => {
  let component: Calculator;
  let fixture: ComponentFixture<Calculator>;
  let compiled: HTMLElement;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculator],
      providers: [{ provide: CalculatorService, useClass: MockCalculatorService }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calculator);
    component = fixture.componentInstance
    compiled = fixture.nativeElement as HTMLElement;
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the current getters', () => {

    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');

  });
  it('should display proper calculation values', () => {

    mockCalculatorService.resultText.and.returnValue('10.00');
    mockCalculatorService.subResultText.and.returnValue('5');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();

    expect(compiled.querySelector('span')?.innerText).toBe('5 -');

    expect(component.resultText()).toBe('10.00');
    expect(component.subResultText()).toBe('5');
    expect(component.lastOperator()).toBe('-');

  });
  it('should have calculator-buttons ', () => {

    expect(component.calculatorButtons().length).toBe(19);

  });
  it('should have 19 calculator-buttons with content projection', () => {

    const buttons = compiled.querySelectorAll('calculator-button');

    expect(buttons.length).toBe(19);

    for (const button of buttons) {
      expect(button.textContent?.trim()).toBeTruthy();
    }

  });

  it('should handle keyboard events correctly', () => {

    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventEscape = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(eventEscape);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');

  });

  it('should display result text correctly', () => {


    mockCalculatorService.resultText.and.returnValue('123')
    mockCalculatorService.subResultText.and.returnValue('5');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();

    expect(component.resultText()).toBe('123');

    expect(compiled.querySelector('#sub-result')?.textContent).toContain('5 -')


  });


});
