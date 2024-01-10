import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent {

  form = new FormGroup({
    service: new FormControl(null, [
      Validators.required
    ]),
    servicePath: new FormControl(null, [
      Validators.required
    ])
  });

  loading: boolean = false;
  version: any = null;
  endpoint: any = null;
  apiKey: any = null;

  constructor(private apiService: ApiService,
    private messageService: MessageService,
    private sessionService: SessionService) {
      this.endpoint = sessionService.getActiveEndpoint();
      this.apiKey = sessionService.getActiveApiKey();
      if(this.endpoint) {
        this.getVersion();
      }
    }

  getVersion() {
    this.loading = true;
    this.apiService.getVersion().subscribe((data: any) => {
      this.version = data;
      this.loading = false;
    }, (err: any) => {
      this.messageService.add({severity: 'error', summary:  'Error', detail: err?.error });
      this.loading = false;
    });
  }

  onClear() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.sessionService.setActiveService(null);
    this.sessionService.setActiveServicePath(null);
  }

  onSave() {
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
  }

}
