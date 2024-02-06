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
    if(this.getActiveEndpoint() && this.getActiveApiKey()) {
      return true;
    } else {
      this.messageService.add({severity: 'warn', summary:  'Missing endpoint or apiKey', detail: 'Please retry connection' });
      this.router.navigate(['/']);
      return false;
    }
  }

  deleteSession() {
    this.setActiveEndpoint(null);
    this.setActiveApiKey(null);
    this.setActiveService(null);
    this.setActiveServicePath(null);
  }

  setActiveEndpoint(endpoint: string | null) {
    if(endpoint) {
      localStorage.setItem('activeEndpoint', endpoint);
    } else {
      localStorage.removeItem('activeEndpoint');
    }
  }

  getActiveEndpoint() {
    return localStorage.getItem('activeEndpoint');
  }

  setActiveApiKey(endpoint: string | null) {
    if(endpoint) {
      localStorage.setItem('activeApiKey', endpoint);
    } else {
      localStorage.removeItem('activeApiKey');
    }
  }

  getActiveApiKey() {
    return localStorage.getItem('activeApiKey');
  }

  setActiveService(endpoint: string | null) {
    if(endpoint) {
      localStorage.setItem('activeService', endpoint);
    } else {
      localStorage.removeItem('activeService');
    }
  }

  getActiveService(): any {
    return localStorage.getItem('activeService');
  }

  setActiveServicePath(endpoint: string | null): any {
    if(endpoint) {
      localStorage.setItem('activeServicePath', endpoint);
    } else {
      localStorage.removeItem('activeServicePath');
    }
  }

  getActiveServicePath(): any {
    return localStorage.getItem('activeServicePath');
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
