import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rightscreen-component',
  templateUrl: './right-screen.component.html',
  styleUrls: ['./right-screen.component.css']
})
export class RightScreenComponent implements OnInit {
  @Output() notifyCloseDetailClicked: EventEmitter<string> = new EventEmitter<string>();
  
  closeClicked() {
    this.notifyCloseDetailClicked.emit('click from nested component.');
  }

  closeRightWindow() {
    document.getElementById('myRightScreen').style.transform = "translateX(100%)";
  }

  openRightWindow() {
    document.getElementById('myRightScreen').style.transform = "translateX(0%)";
  }

  constructor() { }

  ngOnInit() {
  }
}
