import {ComponentFixture, TestBed} from '@angular/core/testing';
import { App } from './app';

describe('App', () => {

  let fixture: ComponentFixture<App>
  let app:App
  let compiled:HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render',()=>{
    const divElement = compiled.querySelector('div');
    const cssClasses = 'min-h-screen'
      expect(divElement?.classList).toContain(cssClasses);
  })

});
