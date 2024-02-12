import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as uuid from 'uuid';

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

  editAgent(agent:any) {
    if(!this.getAgentById(agent.id)) {
      return {error: 'Agent does not exists'};
    }
    this.deleteAgent(agent);
    this.addAgent(agent);
    return null;
  }

  addAgent(agent: any) {
    let strAgents = localStorage.getItem('agents');
    let agents = [];
    if(!strAgents) {
      agents = [];
    } else {
      agents = JSON.parse(strAgents);
    }
    const index = agents.findIndex((a: any) => a.port === agent.port && a.apiKey === agent.apiKey && a.host === agent.host);
    if(index >= 0) {
      return {error: 'Agent already exists'};
    }
    agent.id = uuid.v4();
    agents.push(agent);
    localStorage.setItem('agents', JSON.stringify(agents));
    return null;
  }

  addService(agentId: any, service: any) {
    let agent = this.getAgentById(agentId);
    if(!agent) {
      return {error: 'Agent does not exists'};
    }
    if(!agent.services) {
      agent.services = [];
    }
    agent.services.push(service);
    this.editAgent(agent);
    return;
  }

  deleteAgent(agent:any) {
    let strAgents = localStorage.getItem('agents');
    if(!strAgents) {
      return;
    }
    const agents = JSON.parse(strAgents);
    const newAgents = agents.filter((a: any) => a.id !== agent.id);
    localStorage.setItem('agents', JSON.stringify(newAgents));
  }

  getAgents() {
    const strAgents = localStorage.getItem('agents');
    if(strAgents) {
      return JSON.parse(strAgents);
    }
    return [];
  }

  getAgentById(uuid: any) {
    let strAgents = localStorage.getItem('agents');
    let agents = [];
    if(!strAgents) {
      agents = [];
    } else {
      agents = JSON.parse(strAgents);
    }
    const index = agents.findIndex((a: any) => a.id === uuid);
    if(index < 0) {
      return null;
    }
    return agents[index];
  }

}


