import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MenuItem, MenuResponse} from "../../interfaces/interfaces";
import {environment} from "../../../environments/environment";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {
  constructor(private _http: HttpClient) {
  }

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

  }

  remove(item: MenuItem){
    if(item.quantity){
      item.quantity -= 1;
    }else{
      item.quantity = 0;
    }
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



}
