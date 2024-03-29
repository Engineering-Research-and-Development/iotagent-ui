import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';
import Utils from 'src/app/utils';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddAgentComponent } from 'src/app/components/add-agent/add-agent.component';
import { DetailAgentComponent } from 'src/app/components/detail-agent/detail-agent.component';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss'],
  providers: [ConfirmationService]
})
export class AgentListComponent implements OnInit {
  
  agents: any = [];
  utils = Utils;
  addAgentDialogRef: DynamicDialogRef | undefined;
  detailAgentDialogRef: DynamicDialogRef | undefined;
  pollingTimer: any;

  constructor(private sessionService: SessionService,
              private apiService: ApiService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.getAgents();
    this.pollingTimer = setInterval(() => {
      for(let agent of this.agents) {
        this.testAgent(agent);
      }
    }, 10000);
  }

  testAgents() {
    for(let agent of this.agents) {
      this.testAgent(agent);
    }
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
    this.testAgents();
  }

  onAddAgent() {
    this.addAgentDialogRef = this.dialogService.open(AddAgentComponent, { header: 'Add agent', data: {
      onClose: () => { this.onCloseAddAgent(); }
    }});
  }

  onDeleteAgent(e: any, agent: any) {
    e.stopPropagation();
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Agent',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sessionService.deleteAgent(agent);
        this.getAgents();
      },
      reject: () => {
          return;
      }
    })
  }

  onEditAgent(e: any, agent: any) {
    e.stopPropagation();
    this.addAgentDialogRef = this.dialogService.open(AddAgentComponent, { header: 'Edit agent', data: {
      onClose: () => { this.onCloseAddAgent(); },
      objectToEdit: agent
    }});
  }

  onCloseAddAgent() {
    this.addAgentDialogRef?.close();
    this.getAgents();
  }

  onShowAgentDetail(agent: any) {
    this.detailAgentDialogRef = this.dialogService.open(DetailAgentComponent, { header: 'Agent detail', data: {
      agentId: agent.id,
      onClose: () => {  }
    }});
  }
}
