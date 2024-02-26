import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-global-input',
  templateUrl: './global-input.component.html',
  styleUrls: ['./global-input.component.scss']
})
export class GlobalInputComponent {

  form = new FormGroup({
    service: new FormControl(null, [
      Validators.required
    ]),
    servicePath: new FormControl(null, [
      Validators.required
    ])
  });
  loading: boolean = false;

  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private sessionService: SessionService) {
      if(this.sessionService.getActiveService()) {
        this.form.controls.service.setValue(this.sessionService.getActiveService());
      }
  }

  onClear() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.sessionService.setActiveService(null);
  }

  onSave() {
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
    this.messageService.add({severity: 'success', summary:  'Saved', detail: 'Service and service path correctly saved.' });
  }

}
