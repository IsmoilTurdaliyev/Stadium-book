import { MyOrdersComponent } from './auth/my-orders/my-orders.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyOrderComponent } from './auth/my-orders/my-order/my-order.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'stadiums',
    loadChildren: () =>
      import('./stadiums/stadiums.module').then((m) => m.StadiumsModule),
  },
  {
    path: 'me',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'my_orders', component: MyOrdersComponent },
      { path: 'my_orders/:id', component: MyOrderComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  { path: 'about', component: AboutComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
