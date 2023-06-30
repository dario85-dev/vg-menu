import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MenuItem, MenuResponse} from "../../interfaces/interfaces";
import {environment} from "../../../environments/environment";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  constructor(private _http: HttpClient) {
  }

  showRecap: boolean = false;

  menuLoader$: Observable<MenuResponse> = this._http.get<MenuResponse>(environment.apiUrl).pipe(
    map((response: MenuResponse) => {
      response.menu.map((item: MenuItem) => {
        item.quantity = 0;
        return item;
      });
      return response;
    }),
    tap((response: MenuResponse) => {
      this.menu = response;

    })
  );
  quantities: { [key: string]: number } = {};
  number: number = 0;
  menu: MenuResponse = {
    menu: []
  }

  add(item: MenuItem){
      if(item.quantity){
        item.quantity += 1;
      }else{
        item.quantity = 1;
      }

    //TODO DARIO utilizzo solo per DEMO poi agganciare a quello vero
    this.updateTotalCost()

  }

  remove(item: MenuItem){
    if(item.quantity){
      item.quantity -= 1;
    }else{
      item.quantity = 0;
    }

    //TODO DARIO utilizzo solo per DEMO poi agganciare a quello vero
    this.updateTotalCost()
  }

  sumOfQuantities(item  : MenuItem): number {
    if(item.quantity){
      return item.quantity *item.price;
    }else return 0;

  }
  costOfQuantities(item  : MenuItem): number {
    if(this.quantities[item.name]> 0){
      return this.quantities[item.name] * item.price;
    }else return 0;
  }

  //TODO DARIO utilizzo solo per DEMO poi agganciare a quello vero
  totalCost:number=0;
  updateTotalCost(): number {
    this.totalCost=0;
    this.menu.menu.forEach((item: MenuItem) => {
      if(item.quantity){
        this.totalCost += item.quantity * item.price;
      }
    });
    return this.totalCost;
  }




}
