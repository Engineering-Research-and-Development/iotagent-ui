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

  form = new FormGroup({
    service: new FormControl(null, [
      Validators.required
    ]),
    servicePath: new FormControl(null, [
      Validators.required
    ])
  });
  loading = false;

  devices: any = null;

  constructor(private sessionService: SessionService,
              private apiService: ApiService,
              private messageService: MessageService) {
      this.sessionService.checkSession();
    if(this.sessionService.getActiveService()) {
      this.form.controls.service.setValue(this.sessionService.getActiveService());
    }
    if(this.sessionService.getActiveServicePath()) {
      this.form.controls.servicePath.setValue(this.sessionService.getActiveServicePath());
    }
  }

  getServices() {
    this.apiService.getDevices().subscribe((data: any) => {
      this.devices = data;
      this.loading = false;
    }, (err: any) => {
      this.messageService.add({severity: 'error', summary:  'Error', detail: err?.error?.message });
      this.loading = false;
    });
  }

  onSubmit() {
    this.loading = true;
    if(!this.form.valid) {
      this.messageService.add({severity: 'error', summary:  'Error', detail: 'Invalid fields' });
      this.loading = false;
      return;
    }
    const service = this.form.controls.service.value;
    const servicePath = this.form.controls.servicePath.value;
    if(!service) {
      this.messageService.add({severity: 'error', summary:  'Error', detail: 'Invalid service' });
      this.loading = false;
      return;
    }
    if(!servicePath) {
      this.messageService.add({severity: 'error', summary:  'Error', detail: 'Invalid service path' });
      this.loading = false;
      return;
    }
    this.sessionService.setActiveService(service);
    this.sessionService.setActiveServicePath(servicePath);
    this.getServices();
  }

  onClear() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.sessionService.setActiveService(null);
    this.sessionService.setActiveServicePath(null);
    this.devices = null;
  }
}
