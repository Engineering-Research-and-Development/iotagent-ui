import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  services: any = null;
  loading = false;

  constructor(private sessionService: SessionService,
              private apiService: ApiService,
              private messageService: MessageService) {
    this.sessionService.checkSession();
  }

  getServices() {
    this.loading = true;
    this.apiService.getServices().subscribe((data: any) => {
      this.loading = false;
      this.services = data;
    }, (err: any) => {
      this.loading = false;
      this.messageService.add({severity: 'error', summary:  'Error', detail: err?.error?.message });
    });
  }

  onSubmit() {
    this.getServices();
  }

}
