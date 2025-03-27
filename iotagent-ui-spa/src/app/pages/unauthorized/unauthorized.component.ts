import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environment";
import {SessionService} from "../../services/session/session.service";
import {AuthGuard} from "../../guard/auth.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {

  constructor(private router: Router,
              private keycloakService: KeycloakService,
              private sessionService: SessionService,
              private authGuard: AuthGuard) {}
  retryLogin() {
    this.logoutUser();
  }

  logoutUser() {
    if(environment.keycloakUrl) {
      this.authGuard.logout();
    } else {
      this.sessionService.deleteSession();
      this.sessionService.deleteUserSession();
      this.router.navigate(['/login']);
    }
  }
}
