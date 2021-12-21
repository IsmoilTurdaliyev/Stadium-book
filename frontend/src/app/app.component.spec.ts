import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it("shouldn't display loader if isLoader is falsy", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isLoaderActive = false;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('app-loader')
    ).toBeFalsy();
  });
});
