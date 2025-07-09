import {Component, computed, inject, Signal, viewChildren} from '@angular/core';
import {CalculatorButton} from '../calculator-button/calculator-button';
import {DecimalPipe} from '@angular/common';
import {CalculatorService} from '../../services/calculator';

@Component({
  selector: 'calculator',
  imports: [
    CalculatorButton,
    DecimalPipe
  ],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class Calculator {

  public calculatorButtons = viewChildren(CalculatorButton);

   calculatorService = inject(CalculatorService)

  public resultText:Signal<string> = computed<string>(()=> this.calculatorService.resultText());
  public subResultText:Signal<string>  = computed<string>(()=> this.calculatorService.subResultText());
  public lastOperator:Signal<string>  = computed<string>(()=> this.calculatorService.lastOperator());


  handleClick(key: string) {
    this.calculatorService.constructNumber(key)
  }


  handleKeyboardEvent($event: KeyboardEvent) {


    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      'x': '*',
      '/': '÷',
      P: '%',
      Enter: '='
    }

    const key = keyEquivalents[$event.key] ?? $event.key;

    this.handleClick(key)

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(key)
    })
  }


}
