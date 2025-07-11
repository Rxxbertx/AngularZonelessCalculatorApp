import {Injectable, signal} from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/','÷','x','X']
const specialOperator = [
  "+/-", '%', '.', '=', 'C', 'Backspace'
]


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal<string>('0')
  public subResultText = signal<string>('0')
  public lastOperator = signal<string>('+')

  public constructNumber(value: string) {

    if (![...numbers, ...operators, ...specialOperator].includes(value)) {
      console.log('Invalid input', value)
      return
    }
    if (value === '=') {
      this.calculateResult()
      return
    }
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0')
      this.lastOperator.set('+')
      return
    }
    if (value === 'Backspace') {
      if (this.resultText() === '0') return;

      if (this.resultText().includes('-') && this.resultText().length === 2){
        this.resultText.set('0');
        return;
      }
      if ((this.resultText().length === 1)) {
        this.resultText.set('0')
        return
      }

      this.resultText.update(v => v.slice(0, -1))

    }

    if (operators.includes(value)) {
      this.lastOperator.set(value)
      this.subResultText.set(this.resultText())
      this.resultText.set('0')
    }

    //limitar caracteres
    if (this.resultText().length >= 10) {
      console.log('Max length reached')
    }

    //validar decimal
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.')
        return
      }
      this.resultText.update(text => text + '.')
      return
    }

    //manejo para el 0

    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0'))
      return

    //cambio de signo

    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update(v => v.slice(1))
        return
      }
      this.resultText.update(v => '-' + v)
      return
    }

//numeros
    if (numbers.includes(value)) {

      if (this.resultText() === '0') {
        this.resultText.set(value)
        return
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value)
        return
      }

      this.resultText.update(text => text + value)
      return
    }


  }

  public calculateResult() {
    const number1 = parseFloat(this.subResultText())
    const number2 = parseFloat(this.resultText())

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2
        break;
      case '-':
        result = number1 - number2
        break;
      case '*':
        result = number1 * number2
        break;
      case '/':
        result = number1 / number2
        break
      case '÷':
        result = number1 / number2
        break

    }
    this.resultText.set(result.toString());
    this.subResultText.set('0')

  }

}
