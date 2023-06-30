import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../environments/environment';
import {tap} from "rxjs/operators";
import { Observable } from 'rxjs';
import { MenuResponse } from "./interfaces/interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
