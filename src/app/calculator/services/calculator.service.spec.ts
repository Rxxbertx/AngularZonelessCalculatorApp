import { TestBed } from '@angular/core/testing';
import {CalculatorService} from './calculator.service';


describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('default signal values',()=>{


    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  })

  it(' should set resultText to 0 when C is pressed',()=>{

    service.resultText.set('123');

    service.constructNumber("C");
    expect(service.resultText()).toBe('0');


  })

  it('should update resultTExt with number input', () => {

    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('-');
    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  });

  it('should calculate result correctly for addition', () => {

    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');

  });
  it('should calculate result correctly for substraction', () => {

    service.constructNumber('3');
    service.constructNumber('-');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');

  });
  it('should calculate result correctly for substraction', () => {

    service.constructNumber('3');
    service.constructNumber('-');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');

  });
  it('should calculate result correctly for multiplication', () => {

    service.constructNumber('3');
    service.constructNumber('*');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');

  });
  it('should calculate result correctly for division', () => {

    service.constructNumber('9');
    service.constructNumber('/');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');

  });

  it('should handle decimal point correctly', () => {

    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('3');

    expect(service.resultText()).toBe('1.3');

    service.constructNumber('.');
    expect(service.resultText()).toBe('1.3');

  });
  it('should handle decimal point correctly starting with 0', () => {

    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('0');

    expect(service.resultText()).toBe('0.0');


  });

  it('should handle sign change correctly', () => {

    service.constructNumber('1')
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-1')
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1')


  });

  it('should handle backspace correctly', () => {

    service.resultText.set('123');

    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('12')

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1')
  });

  it('should handle max length correctly', () => {

    for (let i = 0; i<10; i++){
      service.constructNumber('1');
    }

    expect(service.resultText().length).toBe(10);

    service.constructNumber('1');

    expect(service.resultText().length).toBe(10);

  });


});
