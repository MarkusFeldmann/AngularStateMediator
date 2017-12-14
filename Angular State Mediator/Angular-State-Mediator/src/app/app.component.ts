import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RightScreenComponent } from './right-screen/right-screen.component';
import * as jquery from 'jquery';

declare var jQuery: any;

//The mediator interface
export interface IMediatorImpl {
  showNavPanel();
  hideNavPanel();
  showDetailPanel();
  hideDetailPanel();
  changeShowHideSideButton(fromClass: string, toClass: string);
}

export enum StateType {
  MainPanelOnly,
  MainPanelWithSideNav,
  DetailPanel
}

export enum PanelType {
  Primary,
  Detail
}

//The state interface
export interface IState {
  getPanelType(): PanelType;
  getStateType(): StateType;
  isSideNavVisible(): boolean;
  getPanelButtonClass(): string;
}

//The concrete state classes
export class MainPanelOnly
  implements IState {
  getPanelType(): PanelType {
    return PanelType.Primary;
  }
  getStateType(): StateType {
    return StateType.MainPanelOnly;
  }
  getPanelButtonClass(): string { return 'fa-chevron-right'; }
  isSideNavVisible(): boolean { return false; }
}

export class MainPanelWithSideNav
  implements IState {
  getPanelType(): PanelType { return PanelType.Primary; }
  getStateType(): StateType {
    return StateType.MainPanelWithSideNav;
  }
  getPanelButtonClass(): string { return 'fa-chevron-left'; }
  isSideNavVisible(): boolean { return true; }
}
export class DetailPanel implements IState {
  getPanelType(): PanelType { return PanelType.Detail; }
  getStateType(): StateType {
    return StateType.DetailPanel;
  }
  isSideNavVisible(): boolean { return false; }
  getPanelButtonClass(): string { return ''; }
}

//The mediator implemantation
export class Mediator {
  private _mainPanelState = new MainPanelOnly();
  private _detailPanelState = new DetailPanel();
  private _sideNavState = new MainPanelWithSideNav();

  private _currentState: IState;
  private _currentMainPanelState: IState;
  private _mediatorImpl: IMediatorImpl;

  constructor(mediatorImpl: IMediatorImpl) {
    this._mediatorImpl = mediatorImpl;
    this._currentState = this._currentMainPanelState = this._sideNavState;
  }

  getStateImpl(stateType: StateType): IState {
    var stateImpl: IState;
    switch (stateType) {
      case StateType.DetailPanel:
        stateImpl = this._detailPanelState;
        break;
      case StateType.MainPanelOnly:
        stateImpl = this._mainPanelState;
        break;
      case StateType.MainPanelWithSideNav:
        stateImpl = this._sideNavState;
        break;
    }
    return stateImpl;
  }

  getCurrentMainPanelState(): StateType {
    return this._currentMainPanelState.getStateType();
  }

  moveToState(stateType: StateType) {
    var previousState = this._currentState;
    var nextState = this.getStateImpl(stateType);
    if (previousState.getPanelType() == PanelType.Primary &&
      nextState.getPanelType() == PanelType.Detail) {
      this._mediatorImpl.showDetailPanel();
    }
    if (previousState.getPanelType() == PanelType.Detail &&
      nextState.getPanelType() == PanelType.Primary) {
      this._mediatorImpl.hideDetailPanel();
    }
    if (nextState.isSideNavVisible())
      this._mediatorImpl.showNavPanel();
    else
      this._mediatorImpl.hideNavPanel();
    this._mediatorImpl.changeShowHideSideButton(
      previousState.getPanelButtonClass(),
      nextState.getPanelButtonClass());
    this._currentState = nextState;
    if (this._currentState.getPanelType() ==
      PanelType.Primary) {
      this._currentMainPanelState = this._currentState;
    }
  }

  showHideSideNavClicked() {
    switch (this._currentState.getStateType()) {
      case StateType.MainPanelOnly: {
        this.moveToState(StateType.MainPanelWithSideNav);
        break;
      }
      case StateType.MainPanelWithSideNav: {
        this.moveToState(StateType.MainPanelOnly);
        break;
      }
    }
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements IMediatorImpl, AfterViewInit {
  @ViewChild(SideNavComponent)
  private sideNav: SideNavComponent;

  @ViewChild(RightScreenComponent)
  private rightScreen: RightScreenComponent;

  title = 'Select an option';

  //Set the mediator instance

  mediator: Mediator = new Mediator(this);

  //Event Handlers (Button click calls)
  onNotifyRightWindow(message: string): void {
    this.mediator.moveToState(this.mediator.getCurrentMainPanelState());
  }

  buttonClickedDetail() {
    this.mediator.moveToState(StateType.DetailPanel);
  }

  showHideSideNavClicked() {
    this.mediator.showHideSideNavClicked();
  }

  //Mediator Interface Implemantation
  showNavPanel() {
    this.sideNav.showNav();
    document.getElementById('main').style.marginLeft = "250px";
  }

  hideNavPanel() {
    this.sideNav.closeNav();
    document.getElementById('main').style.marginLeft = "0px";
  }

  showDetailPanel() {
    this.rightScreen.openRightWindow();
    document.getElementById('main').style.transform = "translateX(-100%)";
  }

  hideDetailPanel() {
    this.rightScreen.closeRightWindow();
    document.getElementById('main').style.transform = "translateX(0%)";
  }

  changeShowHideSideButton(fromClass: string, toClass: string) {
    if (fromClass.length > 0 && toClass.length > 0) {
      document.getElementById('show-hide-side-button')
        .classList.remove(fromClass);
      document.getElementById('show-hide-side-button')
        .classList.add(toClass);
    }
  }

  //Set the start panel
  ngAfterViewInit() {
    this.mediator.moveToState(StateType.MainPanelWithSideNav);
  }
}
