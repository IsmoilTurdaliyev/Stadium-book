import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @ViewChild('sidebar') sidebar!: ElementRef;
  closerCount: number = 1;
  orderForm!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.orderForm = new FormGroup({
      firstName: new FormControl('David', Validators.required),
      lastName: new FormControl('Uilson', Validators.required),
      email: new FormControl(
        'Ismoiljonturdaliyevv@gmail.com',
        Validators.email
      ),
    });
  }
  // Sidebar opening and closing functions
  onCloseMenu() {
    if (window.screen.width > 767) return;
    this.sidebar.nativeElement.style.transform = `translateX(-100%)`;
    this.sidebar.nativeElement.style.opacity = `0`;
  }
  onOpenMenu() {
    if (window.screen.width > 767) return;
    this.sidebar.nativeElement.style.transform = `translateX(0%)`;
    this.sidebar.nativeElement.style.opacity = `1`;
  }
  submit() {
    if (this.orderForm.status === 'INVALID') {
      return alert('Your order-list is INVALID! Please check again!');
    }
  }

  logout() {
    let dialog = confirm('Are you sure to logout ?');
    if (dialog) {
      this.authService.logout();
    } else {
      return;
    }
  }
}
