import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStadiumComponent } from './select-stadium.component';

describe('SelectStadiumComponent', () => {
  let component: SelectStadiumComponent;
  let fixture: ComponentFixture<SelectStadiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectStadiumComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
