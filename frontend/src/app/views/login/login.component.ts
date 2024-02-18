import { Component } from '@angular/core';
import { BuyDashboardService } from 'src/app/service/buy-dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private buyDashboard: BuyDashboardService) {}
}
