import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AttributesComponent } from 'src/app/components/attributes/attributes.component';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {
  attributesDialogRef: DynamicDialogRef | undefined;

  loading = false;
  devices: any = null;

  constructor(private sessionService: SessionService,
              private apiService: ApiService,
              private messageService: MessageService,
              private dialogService: DialogService) {
      if(this.sessionService.checkSession()) {
        this.getDevices();
      }
  }

  getDevices() {
    this.apiService.getDevices(null, null).subscribe((data: any) => {
      this.devices = data;
      this.loading = false;
    }, (err: any) => {
      this.messageService.add({severity: 'error', summary:  'Error', detail: err?.error?.message });
      this.loading = false;
    });
  }

  onOpenAttributes(device: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Device attributes', data: {
      data: device.attributes,
      onClose: () => {  }
    }});
  }

  onOpenLazy(device: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Device lazy attributes', data: {
      data: device.lazy,
      onClose: () => {  }
    }});
  }

  onOpenCommands(device: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Device commands', data: {
      data: device.commands,
      onClose: () => {  }
    }});
  }

  onOpenStaticAttributes(device: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Device static attributes', data: {
      data: device.static_attributes,
      onClose: () => {  }
    }});
  }
}
