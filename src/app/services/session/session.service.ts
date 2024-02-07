import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router,
              private messageService: MessageService) { }

  checkSession() {
    if(this.getActiveAgent() && this.getActiveService() && this.getActiveServicePath()) {
      return true;
    } else {
      this.messageService.add({severity: 'warn', summary:  'Attention', detail: 'No agent monitoring' });
      this.router.navigate(['/']);
      return false;
    }
  }

  deleteSession() {
    this.setActiveAgent(null);
    this.setActiveService(null);
    this.setActiveServicePath(null);
  }

  setActiveAgent(agent: any) {
    if(agent) {
      localStorage.setItem('activeAgent', agent);
    } else {
      localStorage.removeItem('activeAgent');
    }
  }

  setActiveService(service: any) {
    if(service) {
      localStorage.setItem('activeService', service);
    } else {
      localStorage.removeItem('activeService');
    }
  }

  setActiveServicePath(servicePath: any) {
    if(servicePath) {
      localStorage.setItem('activeServicePath', servicePath);
    } else {
      localStorage.removeItem('activeServicePath');
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

  getActiveServicePath() {
    const activeServicePath = localStorage.getItem('activeServicePath');
    if(activeServicePath) {
      return JSON.parse(activeServicePath);
    }
    return null;
  }

  addAgent(agent:any) {
    let strAgents = localStorage.getItem('agents');
    let agents = [];
    if(!strAgents) {
      agents = [];
    } else {
      agents = JSON.parse(strAgents);
    }
    const index = agents.findIndex((a: any) => a.host === agent.host && a.port === agent.port && a.apiKey === agent.apiKey);
    if(index >= 0) {
      return {error: 'Agent already exists'};
    }
    agents.push(agent);
    localStorage.setItem('agents', JSON.stringify(agents));
    return null;
  }

  deleteAgent(agent:any) {
    let strAgents = localStorage.getItem('agents');
    if(!strAgents) {
      return;
    }
    const agents = JSON.parse(strAgents);
    const newAgents = agents.filter((a: any) => a.host !== agent.host && a.port !== agent.port && a.apiKey !== agent.apiKey);
    localStorage.setItem('agents', JSON.stringify(newAgents));
  }

  getAgents() {
    const strAgents = localStorage.getItem('agents');
    if(strAgents) {
      return JSON.parse(strAgents);
    }
    return [];
  }

}
