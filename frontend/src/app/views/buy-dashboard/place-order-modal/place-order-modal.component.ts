import { Component, Input } from '@angular/core';
import { Token } from 'src/app/model/token';

@Component({
  selector: 'app-place-order-modal',
  templateUrl: './place-order-modal.component.html',
  styleUrls: ['./place-order-modal.component.scss'],
})
export class PlaceOrderModalComponent {
  @Input() token: Token;

  price: number;
  amount: number;
  // currency = 'PLNY';
  // token = 'PKO_BP';

  constructor() {
    this.price = 100; // Default price, could also be set dynamically
    this.amount = 10; // Default amount, could also be set dynamically
  }

  placeOrder() {
    // Logic to place an order
    // console.log(
    //   'Placing order:',
    //   this.price,
    //   this.amount,
    //   this.currency,
    //   this.token
    // );
  }

  makeDeposit() {
    // Logic to make a deposit
    // console.log('Making deposit for:', this.currency);
  }
}
