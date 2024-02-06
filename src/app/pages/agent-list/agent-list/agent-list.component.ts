import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {
  agents: any = [];

  selectedAgent: any;
  isOpenAddAgentDialog: boolean = false;
  isOpenDetailAgentDialog: boolean = false;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.getAgents();
  }

  getAgents() {
    this.agents = this.sessionService.getAgents();
    console.log(this.agents);
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
    this.selectedAgent = agent;
    this.isOpenDetailAgentDialog = true;
  }

}
