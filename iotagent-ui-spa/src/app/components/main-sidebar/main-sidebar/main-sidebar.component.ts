import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { SessionService } from 'src/app/services/session/session.service';
import Utils from 'src/app/utils';
import {environment} from "../../../environment";
import {AuthGuard} from "../../../guard/auth.guard";

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss'],
  providers: [ConfirmationService]
})
export class MainSidebarComponent {

  sidebarVisible = false;
  activeElem: any = null;

  activeAgent: any = null;
  activeService: any = null;

  user: any;

  utils = Utils;

  menuItems = [
    {
      label: 'Agent list', icon: 'pi pi-list', routerLink: '/agent-list'
    },
    {
      label: 'Config groups', icon: 'pi pi-inbox', routerLink: '/config-groups'
    },
    {
      label: 'Devices', icon: 'pi pi-tablet', routerLink: '/devices'
    }
  ];

  breadItems: any = [];
  home = { icon: 'pi pi-home', routerLink: '/' };

  constructor(private router: Router,
              private confirmationService: ConfirmationService,
              private sessionService: SessionService,
              private authGuard: AuthGuard) {
    this.user = sessionService.getLoggedUser();
    this.activeElem = this.router.url;
    const menuItemIndex = this.menuItems.findIndex(item => item.routerLink === this.activeElem);
    this.breadItems = [
      {
        label: this.menuItems[menuItemIndex].label,
        routerLink: this.menuItems[menuItemIndex].routerLink,
      }
    ];
    this.checkAndSetActiveAgentAndService();
    setInterval(() => {
      this.checkAndSetActiveAgentAndService();
    }, 500);
  }

  checkAndSetActiveAgentAndService() {
    const activeAgent = this.sessionService.getActiveAgent();
    if(activeAgent) {
      this.activeAgent = activeAgent;
      const activeService = this.sessionService.getActiveService();
      if(activeService) {
        this.activeService = activeService;
      } else {
        this.activeAgent = null;
        this.activeService = null;
      }
    } else {
      this.activeAgent = null;
      this.activeService = null;
    }
  }

  onMenuClick(elem: any) {
    if(this.isMenuItemEnabled(elem)) {
      this.activeElem = elem;
      this.router.navigate([`/${elem}`]);
      this.sidebarVisible = false;
    }
  }

  isActive(elem: any) {
    return elem === this.activeElem;
  }

  logoutAgent() {
    this.sessionService.deleteSession();
    this.router.navigate(['/']);
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

  onAgentLogout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Disconnect',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.logoutAgent();
      },
      reject: () => {
          return;
      }
    });
  }

  onUserLogout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Disconnect',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.logoutUser();
      },
      reject: () => {
          return;
      }
    });
  }

  isMenuItemEnabled(elem: any){
    if(elem.includes('/agent-list') || (!elem.includes('/agent-list') && this.isAgentSelected())) {
      return true;
    }
    return false;
  }

  isAgentSelected(){
    return this.sessionService.getActiveAgent()
  }

}
