import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';
import Utils from 'src/app/utils';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {
  
  agents: any = [];
  utils = Utils;
  selectedAgent: any;
  isOpenAddAgentDialog: boolean = false;
  isOpenDetailAgentDialog: boolean = false;
  pollingTimer: any;

  constructor(private sessionService: SessionService,
              private apiService: ApiService) {}

  ngOnInit() {
    this.getAgents();
    this.pollingTimer = setInterval(() => {
      for(let agent of this.agents) {
        console.log('polling', agent);
        this.testAgent(agent);
      }
    }, 10000);
  }

  testAgent(agent: any) {
    this.apiService.testConnection(Utils.buildAgentBaseUrl(agent)).subscribe((result: any) => {
      if(result) {
        agent.status = 'active';
      } else {
        agent.status = 'inactive';
      }
    }, (err: any) => {
      agent.status = null;
    });
  }

  getAgents() {
    this.agents = this.sessionService.getAgents();
  }

  onAddAgent() {
    this.isOpenAddAgentDialog = true;
  }

  onDeleteAgent(e: any, agent: any) {
    e.stopPropagation();
    this.sessionService.deleteAgent(agent);
    this.getAgents();
  }

  onCloseAddAgent() {
    this.isOpenAddAgentDialog = false;
    this.getAgents();
  }

  onShowAgentDetail(agent: any) {
    if(agent.status == "active"){
      this.selectedAgent = agent;
      this.isOpenDetailAgentDialog = true;
    }else{
      this.selectedAgent = null
    }
  }
}
