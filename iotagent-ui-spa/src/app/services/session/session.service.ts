import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router, private messageService: MessageService) {
  }       

  checkSession() {
    if(this.getActiveAgent() && this.getActiveService()) {
      return true;
    } else {
      this.messageService.add({severity: 'warn', summary:  'Attention', detail: 'No agent selected' });
      this.router.navigate(['/']);
      return false;
    }
  }

  deleteSession() {
    localStorage.removeItem('activeAgent');
    localStorage.removeItem('activeService');
  }

  setActiveAgent(agent: any) {
    if(agent) {
      localStorage.setItem('activeAgent', JSON.stringify(agent));
    } else {
      localStorage.removeItem('activeAgent');
    }
  }

  setActiveService(service: any) {
    if(service) {
      localStorage.setItem('activeService', JSON.stringify(service));
    } else {
      localStorage.removeItem('activeService');
    }
  }

  getActiveAgent() {
    const activeAgent = localStorage.getItem('activeAgent');
    if(activeAgent) {
      return JSON.parse(activeAgent);
    }
    return null;
  }

  getActiveService() {
    const activeService = localStorage.getItem('activeService');
    if(activeService) {
      return JSON.parse(activeService);
    }
    return null;
  }  

}


