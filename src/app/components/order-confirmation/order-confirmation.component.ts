import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit{

  //inject http client

  constructor(private _activatedRoute: ActivatedRoute) {
  }

  receiptId: number = 0;
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.receiptId = +params['receiptId'];
    });
  }

}
