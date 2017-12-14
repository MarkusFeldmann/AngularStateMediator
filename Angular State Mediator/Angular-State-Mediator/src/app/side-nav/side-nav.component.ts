import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-nav-component',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  closeNav() {
    document.getElementById('mySideNav').style.width = "0px";
  }

  showNav() {
    document.getElementById('mySideNav').style.width = "250px";
  }

  constructor() { }

  ngOnInit() {
  }

}
