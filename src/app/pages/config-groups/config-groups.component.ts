import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-config-groups',
  templateUrl: './config-groups.component.html',
  styleUrls: ['./config-groups.component.scss']
})
export class ConfigGroupsComponent {

  configGroups: any = [];
  loading = false;

  constructor(private apiService: ApiService,
    private messageService: MessageService) {
      this.getConfigGroups();
  }

  getConfigGroups() {
    this.loading = true;
    this.apiService.getConfigGroups().subscribe((data: any) => {
      this.configGroups = data;
      this.loading = false;
    }, (err: any) => {
      this.messageService.add({severity: 'error', summary:  'Error', detail: err?.error?.message });
      this.loading = false;
    });
  }

}
