import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoadingIndicator = true;

  constructor(
    private router: Router){
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart){
        this.showLoadingIndicator = true;
      }

      if (event instanceof NavigationEnd){
        this.showLoadingIndicator = false;
      }
    })
  }
}
