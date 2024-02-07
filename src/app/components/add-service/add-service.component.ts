import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent {
  @Output() addServiceEventEmitter = new EventEmitter<any>();
  
  form = new FormGroup({
    service: new FormControl(null, [
      Validators.required
    ]),
    servicePath: new FormControl(null, [
      Validators.required
    ])
  });
  loading: boolean = false;

  constructor(private messageService: MessageService,
    private sessionService: SessionService) { }

  onSubmit() {
    this.loading = true;
    if (!this.form.valid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid fields' });
      this.loading = false;
      return;
    }
    const service = {
      host: this.form.controls.service.value,
      port: this.form.controls.servicePath.value
    };
    const error = this.sessionService.addAgent(service);
    this.loading = false;
    if (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      this.addServiceEventEmitter.emit(service);
      return;
    }
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Agent added correctly' });
    this.addServiceEventEmitter.emit(service);
  }

  onCancel() {
    this.form.reset();
    this.addServiceEventEmitter.emit();
  }
}
