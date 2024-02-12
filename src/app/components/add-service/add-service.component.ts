import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  
  form = new FormGroup({
    agentId: new FormControl(null),
    service: new FormControl(null, [
      Validators.required
    ]),
    servicePath: new FormControl(null, [
      Validators.required
    ])
  });
  loading: boolean = false;

  constructor(private messageService: MessageService,
    private sessionService: SessionService,
    private dialogConfig: DynamicDialogConfig) {
    }

  ngOnInit(): void {
    console.log(this.dialogConfig.data)
    this.form.controls.agentId = this.dialogConfig.data.agentId;
  }

  onSubmit() {
    this.loading = true;
    if (!this.form.valid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid fields' });
      this.loading = false;
      return;
    }
    const service = {
      service: this.form.controls.service.value,
      servicePath: this.form.controls.servicePath.value
    };
    const error = this.sessionService.addService(this.form.controls.agentId, service);
    this.loading = false;
    if (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error });
      return;
    }
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service added correctly' });
    this.dialogConfig.data.onClose();
    this.form.controls.service.setValue(null);
    this.form.controls.servicePath.setValue(null);
  }

  onCancel() {
    this.form.reset();
    this.form.controls.service.setValue(null);
    this.form.controls.servicePath.setValue(null);
  }
}
