import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './views/header/header.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { BuyDashboardComponent } from './views/buy-dashboard/buy-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './views/footer/footer.component';
import { TableComponent } from './views/buy-dashboard/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { PlaceOrderModalComponent } from './views/buy-dashboard/place-order-modal/place-order-modal.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    BuyDashboardComponent,
    FooterComponent,
    TableComponent,
    PlaceOrderModalComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
