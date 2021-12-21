import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectStadiumComponent } from './select-stadium/select-stadium.component';
import { StadiumsComponent } from './stadiums.component';
import { RouterModule } from '@angular/router';
import { StadiumPageComponent } from './stadium-page/stadium-page.component';
import { SharedModule } from '../shared/shared.module';
import { OrderStadiumComponent } from './order-stadium/order-stadium.component';
import { OrderComponent } from './order/order.component';

const routes = [
  {
    path: '',
    component: StadiumsComponent,
    children: [
      { path: '', component: SelectStadiumComponent },
      { path: ':id', component: StadiumPageComponent },
      { path: ':id/order', component: OrderStadiumComponent },
      { path: ':id/orders/:id', component: OrderComponent },
    ],
  },
];

@NgModule({
  declarations: [
    SelectStadiumComponent,
    StadiumsComponent,
    StadiumPageComponent,
    OrderStadiumComponent,
    OrderComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StadiumsModule {}
