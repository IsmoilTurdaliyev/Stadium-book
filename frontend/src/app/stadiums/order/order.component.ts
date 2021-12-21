import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  informationForCopy!: string;
  date = new Date();
  constructor() {}

  ngOnInit(): void {
    this.informationForCopy =
      'Ordered by: Shukurullo Shukurulloyev, \r From: 19:00, \r To: 21:00';
  }
}
