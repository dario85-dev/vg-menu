import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatLineModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    DashboardComponent,
    OrderConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'code', component: AppComponent},
      {path: 'order-confirmation', component: OrderConfirmationComponent}
    ]),
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatLineModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
