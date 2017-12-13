import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Select an option';
  isSIdeNavVisible = true;
  showHideSideClicked() {
    if (this.isSIdeNavVisible) {
      document.getElementById('main').style.marginLeft = "0px";
      document.getElementById('mySideNav').style.width = "0px";
      this.isSIdeNavVisible = false;
    } else {
      document.getElementById('main').style.marginLeft = "250px";
      document.getElementById('mySideNav').style.width = "250px";
      this.isSIdeNavVisible = true;
    }
  }

  buttonClickedDetail() {
    document.getElementById('myRightScreen').style.transform = "translateX(0%)";
    document.getElementById('main').style.transform = "translateX(-100%)";
  }

  closeClicked() {
    document.getElementById('myRightScreen').style.transform = "translateX(100%)";
    document.getElementById('main').style.transform = "translateX(0%)";
  }
}
