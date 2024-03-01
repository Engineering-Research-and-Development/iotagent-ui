import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { SessionService } from 'src/app/services/session/session.service';
import Utils from 'src/app/utils';

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
              private sessionService: SessionService) {
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

  logout() {
    this.sessionService.deleteSession();
    this.router.navigate(['/']);
  }

  onLogout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Disconnect',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.logout();
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
