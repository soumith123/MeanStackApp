import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private hc:HttpClient) {}

  getProducts():Observable<any>
  {
    return this.hc.get("/product/getproducts")
  }
}