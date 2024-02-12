import { Component, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { SessionService } from 'src/app/services/session/session.service';
import { AddServiceComponent } from '../add-service/add-service.component';

@Component({
  selector: 'app-detail-agent',
  templateUrl: './detail-agent.component.html',
  styleUrls: ['./detail-agent.component.scss']
})
export class DetailAgentComponent {
  @ViewChild('dt') dt: Table | undefined;
  
  addServiceDialogRef: DynamicDialogRef | undefined;
  agent: any;

  constructor(private sessionService: SessionService,
    private dialogService: DialogService,
    private dialogConfig: DynamicDialogConfig) {
      this.agent = this.dialogConfig.data.agent;
      if(!this.agent.services) {
        this.agent.services = [];
      }
    }
  
  refreshAgent() {
    const agent = this.sessionService.getAgentById(this.agent.id);
    this.agent = agent;
  }

  insertService(){
    this.addServiceDialogRef = this.dialogService.open(AddServiceComponent, { header: 'Add service', data: {
      onClose: () => { this.onCloseAddService(); },
      agentId: this.agent.id
    }});
  }

  editService(service: any) {
    
  }
  deleteService(service: any) {
    
  }

  deleteSelectedServices(){

  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  
  onCloseAddService() {
    this.addServiceDialogRef?.close();
    this.refreshAgent();
  }
}
