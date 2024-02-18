import { Component } from '@angular/core';
import { Token } from 'src/app/model/token';
import { BuyDashboardService } from 'src/app/service/buy-dashboard.service';

@Component({
  selector: 'app-buy-dashboard',
  templateUrl: './buy-dashboard.component.html',
  styleUrls: ['./buy-dashboard.component.scss'],
})
export class BuyDashboardComponent {
  tokens: Token[];

  constructor(private buyDashboard: BuyDashboardService) {}

  ngOnInit() {
    this.buyDashboard.getTokens().subscribe(elem => {
      this.tokens = elem;
      // this.selectedRecipe = recipe;
    });
  }
}
