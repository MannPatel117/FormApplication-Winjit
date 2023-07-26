import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
  switch(window.location.pathname)
  {
    case '': this.routeHome();
    break;
    case '/admin/display': this.routeShow();
    break;
    case '/admin/form': this.routeRegister();
    break;
  }

  }
  constructor(private route: Router)
  {

  }
  home=false;
  register=false;
  display=false;
  routeHome(){
    this.route.navigate(['']);
    this.register=false;
    this.display=false;
    this.home=true;
  }
  
  routeRegister(){
    this.home=false;
    this.display=false;
    this.register=true;
    this.route.navigate(['/admin/form']);
  }
  routeShow(){
    this.home=false;
    this.register=false;
    this.display=true;
    this.route.navigate(['/admin/display']);
  }
}
