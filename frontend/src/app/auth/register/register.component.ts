import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  active = 'active';
  registerForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(14),
        Validators.minLength(9),
      ]),
    });
  }

  submit() {
    console.log(this.registerForm);
    this.authService.signup(this.registerForm.value).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
