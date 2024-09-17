import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import {environment} from "../environment";
import {SessionService} from "../services/session/session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private sessionSevice: SessionService
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    } else {
      try {
        await this.keycloak.loadUserProfile(true);
        this.sessionSevice.setLoggedUser(
          this.keycloak.getUsername(),
          this.keycloak.getToken()
        );
      } catch (e) {
        console.error(e);
      }
    }

    return this.authenticated;
  }

  async logout() {
    await this.keycloak.logout(environment.KEYCLOAK_REDIRECT_URI);
  }
}
