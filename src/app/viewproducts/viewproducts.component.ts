import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

  products:any;

  constructor(private ps:ProductsService) { }

  ngOnInit(): void 
  {
    this.ps.getProducts().subscribe(
      products=>
      {
        this.products=products;
      },
      err=>
      {
        console.log("error is", err)
      }
    )
  }

}
