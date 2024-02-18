import { Component, Input } from '@angular/core';
import { Token } from 'src/app/model/token';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tokens: Token[];

  selectedToken: Token;

  placeOffer(token: any) {
    console.log('Placing offer for', token);
  }

  openPlaceOfferModal(token: Token) {
    console.log('PLACEOFFER');
    console.log(token);
    this.selectedToken = token;
  }

  openOrderBook(token: any) {
    console.log('Opening order book for', token);
  }
}
