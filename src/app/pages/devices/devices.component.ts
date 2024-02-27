import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {

  loading = false;
  devices: any = null;

  constructor(private sessionService: SessionService,
              private apiService: ApiService,
              private messageService: MessageService) {
      if(this.sessionService.checkSession()) {
        this.getDevices();
      }
  }

  getDevices() {
    this.apiService.getDevices().subscribe((data: any) => {
      this.devices = data;
      this.loading = false;
    }, (err: any) => {
      this.messageService.add({severity: 'error', summary:  'Error', detail: err?.error?.message });
      this.loading = false;
    });
  }

}
