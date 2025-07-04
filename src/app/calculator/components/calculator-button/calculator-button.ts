import {Component, HostBinding, input} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.html',
  styleUrl: './calculator-button.css',
  host: {
    class: "w-1/4 border-r border-b border-indigo-400"
  }
})
export class CalculatorButton  {

  public isCommand = input(false,{
    transform: (value:boolean|string) =>
      typeof value === 'string' ? value === '' : value
  })
  public isDoubleSize = input(false,{
    transform: (value:boolean|string) =>
      typeof value === 'string' ? value === '' : value
  })

  // hace un bind a lo del host de arriba
  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize()
  }


}
