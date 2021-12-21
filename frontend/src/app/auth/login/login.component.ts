import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  active = 'active';
  loginForm!: FormGroup;
  errorText = '';
  subs: Subscription[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  submit() {
    this.errorText = '';
    this.subs.push(
      this.authService
        .login(this.loginForm.value.login, this.loginForm.value.password)
        .subscribe(
          (res: any) => {
            this.authService.saveJwt(res['access']);
            this.authService.saveRefresh(res['refresh']);
            this.authService.isLoggedIn.next(true);
            this.router.navigate(['/']);
          },
          (err) => {
            console.log(err);
            this.errorText = 'Wrong login or password!';
            this.loginForm.reset();
          }
        )
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
