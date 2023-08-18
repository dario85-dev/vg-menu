import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {MenuItem} from "../../interfaces/interfaces";
import {environment} from "../../../environments/environment";
import {map, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit{
  constructor(private _http: HttpClient, private _router: Router, private _activatedRoute: ActivatedRoute) {
  }

  showRecap: boolean = false;
  receiptId: number = 0;
  orderId: number = 0;


  ngOnInit(): void {
    //get order id from url if exists
    this._activatedRoute.params.subscribe(params => {
      this.orderId = params['orderID'];
      //if order exist try to get order details
      if (this.orderId) {
        this.getOrderDetails();
      }
    });
  }



  menuLoader$: Observable<MenuItem[]> = this._http.get<MenuItem[]>(environment.apiUrl+'/menu').pipe(
    map((response: MenuItem[]) => {
      response.map((item: MenuItem) => {
        item.qta = 0;
        return item;
      });
      return response;
    }),
    tap((response: MenuItem[]) => {
      this.menu = response;

    })
  );
  quantities: { [key: string]: number } = {};
  number: number = 0;
  menu: MenuItem[] = [];

  add(item: MenuItem){
      if(item.qta){
        item.qta += 1;
      }else{
        item.qta = 1;
      }
      this.updateTotalCost()

  }

  remove(item: MenuItem){
    if(item.qta){
      item.qta -= 1;
    }else{
      item.qta = 0;
    }
    this.updateTotalCost()
  }

  sumOfQuantities(item  : MenuItem): number {
    if(item.qta){
      return item.qta *item.price;
    }else return 0;

  }

  totalCost:number=0;
  updateTotalCost(): number {
    this.totalCost=0;

    this.menu.forEach((item: MenuItem) => {
      if(item.qta){
        this.totalCost += item.qta * item.price;
      }
    });
    return this.totalCost;
  }

  getListForServer(){
    const filteredMenu = this.menu.filter((item: MenuItem) => {
      // @ts-ignore
      return item.qta > 0;
    });
    return filteredMenu.map((item: MenuItem) => {
      return {
        name: item.name,
        qta: item.qta
      }
    });

  }

  //ask to the server for a receipt id
  getReceiptId(): Observable<any>  {
    return this._http.get<{receiptId: number}>(environment.apiUrl + '/new_receipt_id')
  }

  //send the order to the server
  sendOrderRequest(receipt_id: string): Observable<any> {
    return this._http.post(environment.apiUrl + '/receipt?id='+receipt_id, this.getListForServer())
  }

  //send the order to the server
  sendOrder() {
    this.getReceiptId().pipe(
      switchMap((response: number) => {
        this.receiptId = response;
        return this.sendOrderRequest(this.receiptId.toString());
      })
    ).subscribe((response: any) => {
      console.log(response);
      this._router.navigate(['/order-confirmation', response.id]);
    });
  }


  //TODO DOY
  getOrderDetails(){
    //get order details from server using orderID
    //if successfull populate recap with order details
  }




}
