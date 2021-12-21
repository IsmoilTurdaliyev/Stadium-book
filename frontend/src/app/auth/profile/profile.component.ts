import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  UserInformationForm!: FormGroup;
  ngOnInit() {
    this.UserInformationForm = new FormGroup({
      firstName: new FormControl('Ismoil', Validators.required),
      lastName: new FormControl('Turdaliyev', Validators.required),
      email: new FormControl('who.Knows@time.shows', [
        Validators.email,
        Validators.required,
      ]),
      phone: new FormControl('+998993667639', [
        Validators.required,
        Validators.pattern(/(?:\+[9]{2}[8][0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2})/),
      ]),
    });
  }
  submit() {
    if (this.UserInformationForm.status === 'INVALID') {
      return alert('Your informations are not correct!');
    }
    console.log(this.UserInformationForm);
  }
}
