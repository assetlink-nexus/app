import { Component, Input } from '@angular/core';
import { Token } from 'src/app/model/token';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tokens: Token[];

  // tokens = [
  //   { name: 'TokenPKOBP', amount: 200000000 },
  //   { name: 'TokenPKOBP', amount: 200000000 },
  //   { name: 'TokenPKOBP', amount: 200000000 },
  //   { name: 'TokenPKOBP', amount: 200000000 },
  //   { name: 'TokenPKOBP', amount: 200000000 },
  // ];

  placeOffer(token: any) {
    console.log('Placing offer for', token);
  }

  openOrderBook(token: any) {
    console.log('Opening order book for', token);
  }
}
