import {Routes} from '@angular/router';
import {CalculatorView} from './calculator/views/calculator-view/calculator-view';

export const routes: Routes = [
  {
    path: 'calculator',
    component: CalculatorView
  },
  {
    path: '**',
    redirectTo: 'calculator'
  }
];
