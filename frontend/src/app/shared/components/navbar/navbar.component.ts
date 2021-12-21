import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('logo', { static: true }) logo!: ElementRef<HTMLDivElement>;
  @ViewChild('actions', { static: true }) actions!: ElementRef<HTMLDivElement>;
  @ViewChild('toggleImg', { static: true })
  toggleImg!: ElementRef<HTMLImageElement>;
  isWatch: boolean = false;
  isLoggedIn: boolean = false;
  subs: Subscription[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.ballAnim();
    this.subs.push(
      this.authService.isLoggedIn.subscribe((status: boolean) => {
        this.isLoggedIn = status;
      })
    );
  }
  navbarMenu(result: boolean) {
    if (screen.width >= 576) return;
    if (result) {
      this.actions.nativeElement.style.transform = 'translateY(0%) scaleY(1)';
      this.toggleImg.nativeElement.style.transform = 'rotate(-180deg)';
    } else {
      this.actions.nativeElement.style.transform = 'translateY(-50%) scaleY(0)';
      this.toggleImg.nativeElement.style.transform = 'rotate(0deg)';
    }
    this.isWatch = result;
  }

  ballAnim() {
    gsap.from(this.logo.nativeElement.childNodes[1], {
      scale: 0.2,
      //  y: 500,
      rotate: 87,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
