import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { SessionService } from 'src/app/services/session/session.service';
import Utils from 'src/app/utils';

@Component({
  selector: 'app-detail-agent',
  templateUrl: './detail-agent.component.html',
  styleUrls: ['./detail-agent.component.scss']
})
export class DetailAgentComponent {
  @ViewChild('dt') dt: Table | undefined;
  
  services: any = [];
  selectedServices: any = [];

  isOpenAddServiceDialog: boolean = false;

  constructor(private sessionService: SessionService) {}

  insertService(){
    this.isOpenAddServiceDialog = true;
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
    this.isOpenAddServiceDialog = false;
    //this.getServicesForAgent();
  }
}
