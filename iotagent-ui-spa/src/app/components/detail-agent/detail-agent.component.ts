import { Component, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { SessionService } from 'src/app/services/session/session.service';
import { ApiService } from 'src/app/services/api/api.service';
import { AddServiceComponent } from '../add-service/add-service.component';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-detail-agent',
  templateUrl: './detail-agent.component.html',
  styleUrls: ['./detail-agent.component.scss'],
  providers: [ConfirmationService]
})
export class DetailAgentComponent {
  @ViewChild('dt') dt: Table | undefined;
  
  addServiceDialogRef: DynamicDialogRef | undefined;
  agent: any;

  constructor(private sessionService: SessionService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private dialogConfig: DynamicDialogConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
      this.agent = this.apiService.getAgent(this.dialogConfig.data.agentId).subscribe(data => {
        this.agent = data;
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      });
    }
  
  refreshAgent() {
    this.agent = this.apiService.getAgent(this.dialogConfig.data.agentId).subscribe(data => {
      console.log(data)
      this.agent = data;
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    });
  }

  insertService(){
    this.addServiceDialogRef = this.dialogService.open(AddServiceComponent, { header: 'Add service', data: {
      onClose: () => { this.onCloseAddService(); },
      agentId: this.agent._id
    }});
  }

  deleteService(service: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Service',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteService(this.agent._id, service._id).subscribe(data => {
          this.refreshAgent();
        }, err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        });
      },
      reject: () => {
          return;
      }
    });
  }

  activateService(service: any) {
    this.sessionService.setActiveAgent(this.agent);
    this.sessionService.setActiveService(service);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: service.service +' service setted up successfully' });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  
  onCloseAddService() {
    this.addServiceDialogRef?.close();
    this.refreshAgent();
  }

  isServiceAlreadyActive(service: any){
    return this.sessionService.getActiveService()?.service == service.service
  }
}
