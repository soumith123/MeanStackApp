import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

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
