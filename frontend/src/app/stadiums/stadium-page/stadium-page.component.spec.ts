import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumPageComponent } from './stadium-page.component';

describe('StadiumPageComponent', () => {
  let component: StadiumPageComponent;
  let fixture: ComponentFixture<StadiumPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StadiumPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
