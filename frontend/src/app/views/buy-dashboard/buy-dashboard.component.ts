import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/model/token';
import { BuyDashboardService } from 'src/app/service/buy-dashboard.service';

@Component({
  selector: 'app-buy-dashboard',
  templateUrl: './buy-dashboard.component.html',
  styleUrls: ['./buy-dashboard.component.scss'],
})
export class BuyDashboardComponent implements OnInit {
  tokens: Token[];

  constructor(private buyDashboardService: BuyDashboardService) {}

  ngOnInit() {
    this.buyDashboardService.getTokens().subscribe(elem => {
      this.tokens = elem;
      console.log('TOKEEENS');
      console.log(this.tokens);
      // this.selectedRecipe = recipe;
    });
  }
}
