import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  constructor(private ps:ProductsService) {}

  ngOnInit(): void {
  }

  file:File;

  selectFile(event)
  {
    this.file=event.target.files[0];
  }


  onSubmitProduct(productObj)
  {
    let formData=new FormData();

    formData.append("photo",this.file)

    formData.append("productObj",JSON.stringify(productObj))

    this.ps.createProducts(formData).subscribe(
      res=>
      {
        if(res.message==="New product created")
        {
          alert("New Product Created")
        }
        else
        {
          alert(res.message)
        }
      },
      err=>
      {
        console.log("error in submitting product details is", err)
        alert("Something went wrong in user creation")
      }
    )
  } 
}
