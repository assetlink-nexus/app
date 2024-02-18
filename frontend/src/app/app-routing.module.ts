import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyDashboardComponent } from './views/buy-dashboard/buy-dashboard.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '', component: BuyDashboardComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
