import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoginStatus=false;

  constructor(private hc:HttpClient) {}

  createUser(userObj):Observable<any>
  {
    return this.hc.post("/user/createuser",userObj)
  }

  getUser(username):Observable<any>
  {
    return this.hc.get(`/user/getuser/${username}`)
  }

  loginUser(credentials):Observable<any>
  {
    return this.hc.post("/user/login",credentials)
  }
}