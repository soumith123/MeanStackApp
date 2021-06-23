import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userObj;

  constructor(private hc:HttpClient) { }

  ngOnInit(): void {
    this.userObj=JSON.parse(localStorage.getItem("userObj"))
  }
  

  getPrivateData()
  {
    this.hc.get("/user/testing").subscribe(
      res=>
      {
        alert(res['message'])
      },
      err=>
      {
        console.log(err)
        alert(err.message)
      }
    )
  }

}
