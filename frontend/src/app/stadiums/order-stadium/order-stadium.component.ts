import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Component
@Component({
  selector: 'app-order-stadium',
  templateUrl: 'order-stadium.component.html',
  styleUrls: ['order-stadium.component.scss'],
})
export class OrderStadiumComponent implements OnInit {
  orderForm!: FormGroup;
  ngOnInit() {
    this.orderForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/(?:\+[9]{2}[8][0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2})/),
      ]),
      from: new FormControl(null, Validators.required),
      to: new FormControl(null, Validators.required),
    });
  }
  submit() {
    if (this.orderForm.status === 'INVALID') {
      return alert('Your order-list is INVALID! Please check again!');
    }
    console.log(this.orderForm);
  }
}
