import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit{

  //inject http client

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
  }

  receiptId: number = 0;
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      //get the receiptId url param



      this.receiptId = params['receiptId'];
      console.log('PARAMS', params, this.receiptId);

    });
  }

  editSavedOrder(){
    //navigate to the menu page
    this._router.navigate(['menu-list', this.receiptId]);
  }

}
