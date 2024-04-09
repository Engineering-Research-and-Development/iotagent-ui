import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddConfigGroupComponent } from 'src/app/components/add-config-group/add-config-group.component';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-config-groups',
  templateUrl: './config-groups.component.html',
  styleUrls: ['./config-groups.component.scss'],
  providers: [ConfirmationService]
})
export class ConfigGroupsComponent {
  addConfigGroupDialogRef: DynamicDialogRef | undefined;

  configGroups: any = [];
  loading = false;

  constructor(private apiService: ApiService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService) {
      this.getConfigGroups();
  }

  getConfigGroups() {
    this.loading = true;
    this.apiService.getConfigGroups().subscribe((data: any) => {
      this.configGroups = data;
      this.loading = false;
    }, (err: any) => {
      this.messageService.add({severity: 'error', summary:  'Error', detail: err?.error?.message });
      this.loading = false;
    });
  }

  editConfigGroup(configGroup: any) {
    this.addConfigGroupDialogRef = this.dialogService.open(AddConfigGroupComponent, {
      header: 'Edit ConfigGroup',
      data: {
        configGroup,
        onClose: () => { this.onCloseAddConfigGroup(); },
        objectToEdit: configGroup
      },
      width: '80vw',
      height: '80vh'
    });
  }

  deleteConfigGroup(configGroup: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete config group',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.removeConfigGroup(configGroup.resource, configGroup.apikey).subscribe(data => {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'ConfigGroup removed correctly' });
          this.getConfigGroups();
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

  onAddConfigGroup() {
    this.addConfigGroupDialogRef = this.dialogService.open(AddConfigGroupComponent, {
      header: 'Add config group',
      data: {
        onClose: () => { this.onCloseAddConfigGroup(); }
      },
      width: '80vw',
      height: '80vh'
    });
  }

  onCloseAddConfigGroup() {
    this.addConfigGroupDialogRef?.close();
    this.getConfigGroups();
  }

}
