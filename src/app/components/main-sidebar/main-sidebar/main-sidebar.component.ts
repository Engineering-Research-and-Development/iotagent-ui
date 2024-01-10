import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss'],
  providers: [ConfirmationService]
})
export class MainSidebarComponent {

  sidebarVisible = false;
  activeElem: any = null;

  menuItems = [
    {
      label: 'Connection', icon: 'pi pi-wifi', routerLink: '/connection'
    },
    {
      label: 'Services', icon: 'pi pi-globe', routerLink: '/services'
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
    this.sessionService.checkSession();
    this.activeElem = this.router.url;
    const menuItemIndex = this.menuItems.findIndex(item => item.routerLink === this.activeElem);
    this.breadItems = [
      {
        label: this.menuItems[menuItemIndex].label,
        routerLink: this.menuItems[menuItemIndex].routerLink,
      }
    ];
  }

  onMenuClick(elem: any) {
    this.activeElem = elem;
    this.router.navigate([`/${elem}`]);
    this.sidebarVisible = false;
  }

  isActive(elem: any) {
    return elem === this.activeElem;
  }

  logout() {
    this.sessionService.deleteSession();
    this.router.navigate(['/bootstrap']);
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

  

}
