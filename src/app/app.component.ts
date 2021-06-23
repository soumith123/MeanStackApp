import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'connection';

  constructor(public us:UserService) {}

  userLogin()
  {
    localStorage.clear();
    this.us.userLoginStatus=false;
  }
}
