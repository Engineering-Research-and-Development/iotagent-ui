import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-detail-agent',
  templateUrl: './detail-agent.component.html',
  styleUrls: ['./detail-agent.component.scss']
})
export class DetailAgentComponent {
  @ViewChild('dt') dt: Table | undefined;
  
  services: any = [];
  selectedServices: any = [];

  insertService(){

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
  
}
