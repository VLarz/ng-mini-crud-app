import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  subscription: Subscription;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  userSubscription(): void {
    this.subscription =  this.authenticationService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }


}
