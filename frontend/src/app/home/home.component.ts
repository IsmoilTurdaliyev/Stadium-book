import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  centered = false;
  disabled = false;
  unbounded = false;
  radius!: number;
  color: string = '#08de087f';
  constructor() {}

  ngOnInit(): void {}

  scrollDown() {
    setTimeout(() => {
      window.scroll({
        top: 660,
        left: 0,
        behavior: 'smooth',
      });
    }, 300);
  }
}
