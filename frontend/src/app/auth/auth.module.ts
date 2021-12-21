import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { ProfileComponent } from './profile/profile.component';
import { MyOrderComponent } from './my-orders/my-order/my-order.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AuthComponent,
    ProfileComponent,
    MyOrdersComponent,
    MyOrderComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule, CommonModule],
  exports: [],
})
export class AuthModule {}
