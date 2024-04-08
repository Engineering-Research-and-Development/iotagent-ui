import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddDeviceComponent } from 'src/app/components/add-device/add-device.component';
import { AttributesComponent } from 'src/app/components/attributes/attributes.component';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  providers: [ConfirmationService]
})
export class DevicesComponent {
  attributesDialogRef: DynamicDialogRef | undefined;
  addDeviceDialogRef: DynamicDialogRef | undefined;

  loading = false;
  devices: any = null;

  constructor(private sessionService: SessionService,
              private apiService: ApiService,
              private messageService: MessageService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
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

  onAddDevice() {
    this.addDeviceDialogRef = this.dialogService.open(AddDeviceComponent, {
      header: 'Add device',
      data: {
        onClose: () => { this.onCloseAddDevice(); }
      },
      width: '80vw',
      height: '80vh'
    });
  }

  editDevice(device: any) {
    this.addDeviceDialogRef = this.dialogService.open(AddDeviceComponent, {
      header: 'Edit device',
      data: {
        device,
        onClose: () => { this.onCloseAddDevice(); },
        objectToEdit: device
      },
      width: '80vw',
      height: '80vh'
    });
  }

  deleteDevice(device: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Device',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.removeDevice(device.device_id).subscribe(data => {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Device removed correctly' });
          this.getDevices();
        }, (err) => {
          this.messageService.add({severity: 'error', summary:  'Error', detail: err?.error?.message });
          this.loading = false;
        });
      },
      reject: () => {
          return;
      }
    })
  }

  onCloseAddDevice() {
    this.addDeviceDialogRef?.close();
    this.getDevices();
  }
}
