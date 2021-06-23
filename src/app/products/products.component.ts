import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any[];

  constructor(private ps:ProductsService) { }

  ngOnInit(): void 
  {
    this.ps.getProducts().subscribe(
      products=>
      {
        this.products=products.message
      },
      err=>
      {
        console.log("error is", err)
        alert(err.message)
      }
    )
  }

}
