import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { delay } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  isLoaderActive: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.loaderService.isLoaderActive.pipe(delay(0)).subscribe((loader) => {
      this.isLoaderActive = loader;
    });
  }
  ngOnInit() {
    AOS.init();
    if (this.authService.verify()) {
      this.authService.isLoggedIn.next(true);
    }
    
  }
}
