import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  constructor(private _Router:Router){}

  logOut()
  {
    localStorage.removeItem("Token") ;
    this._Router.navigate(['./signIn'])

  }

}
