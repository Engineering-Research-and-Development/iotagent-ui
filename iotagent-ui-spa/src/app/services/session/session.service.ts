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

  editAgent(agent:any) {
    if(!this.getAgentById(agent.id)) {
      return {error: 'Agent does not exists'};
    }
    this.deleteAgent(agent);
    this.addAgent(agent, agent.id);
    return null;
  }

  addAgent(agent: any, customUuid?: any) {
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
    agent.id = customUuid ? customUuid : uuid.v4();
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

  deleteService(agentId: any, service: any) {
    let agent = this.getAgentById(agentId);
    if(!agent) {
      return {error: 'Agent does not exists'};
    }
    if(agent.services) {
      let newServices = [];
      for(let s of agent.services) {
        if(s.service !== service.service && s.servicePath !== service.servicePath) {
          newServices.push(s);
        }
      }
      agent.services = newServices;
      this.editAgent(agent);
      return;
    }
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


