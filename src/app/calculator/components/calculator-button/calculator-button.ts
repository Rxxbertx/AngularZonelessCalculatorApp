import {Component, ElementRef, input, output, signal, viewChild} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.html',
  styleUrl: './calculator-button.css',
  host: {
    class: "border-r border-b border-indigo-400",
    '[class.w-2/4]' : 'isDoubleSize()',
    '[class.w-1/4]' : '!isDoubleSize()',
  }
})
export class CalculatorButton {

  public onClick = output<string>()

  isPressed = signal<any | null>(null);

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  })
  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  })


  handleClick() {

    if (!this.contentValue()?.nativeElement)
      return

    this.onClick.emit(this.contentValue()?.nativeElement.innerText ?? '0')

  }

  keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return

    const value = this.contentValue()?.nativeElement.innerText

    if (value !== key) return;

    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100)

  }

}
