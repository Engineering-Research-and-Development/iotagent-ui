import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})

export class AddDeviceComponent implements OnInit {
  isEdit = false;

  form = new FormGroup({
    device: new FormControl<any>(null, [
      Validators.required
    ])
  });
  loading: boolean = false;

  constructor(private messageService: MessageService,
              private sessionService: SessionService,
              private dialogConfig: DynamicDialogConfig,
              private apiService: ApiService
  ) {
      
    }

  ngOnInit() {
    if(this.dialogConfig.data.objectToEdit) { 
      this.isEdit = true;
      let updatePayload = {
        attributes: this.dialogConfig.data.objectToEdit.attributes,
        lazy: this.dialogConfig.data.objectToEdit.lazy,
        commands: this.dialogConfig.data.objectToEdit.commands,
        static_attributes: this.dialogConfig.data.objectToEdit.static_attributes
      }
      this.form.controls.device.setValue(JSON.stringify(updatePayload, null, 2));
    }
  }

  onSubmit() {
    this.loading = true;
    if (!this.form.valid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid fields' });
      this.loading = false;
      return;
    }

    let device: any = {};
    const deviceStr = this.form.controls.device.value;

    if(deviceStr != null) {
      try {
        device = JSON.parse(deviceStr);
      } catch (e) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'JSON syntax error' });
      }
    }

    if(this.dialogConfig.data.objectToEdit) {
      this.apiService.editDevice(this.dialogConfig.data.objectToEdit.device_id, device).subscribe(data => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Device updated correctly' });
        this.dialogConfig.data.onClose();
      }, err => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        this.dialogConfig.data.onClose();
      });
    } else {
      this.apiService.createDevice(device).subscribe(data => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Device added correctly' });
        this.dialogConfig.data.onClose();
      }, err => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        this.dialogConfig.data.onClose();
      });
    }    
  }

  onCancel() {
    this.form.reset();
    this.dialogConfig.data.onClose();
  }
}
