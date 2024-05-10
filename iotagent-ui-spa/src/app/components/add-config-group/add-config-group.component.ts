import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-add-config-group',
  templateUrl: './add-config-group.component.html',
  styleUrls: ['./add-config-group.component.scss']
})
export class AddConfigGroupComponent implements OnInit {
  isEdit = false;

  form = new FormGroup({
    configGroup: new FormControl<any>(null, [
      Validators.required
    ])
  });
  loading: boolean = false;

  constructor(private messageService: MessageService,
              private dialogConfig: DynamicDialogConfig,
              private apiService: ApiService
  ) {
      
    }

  ngOnInit() {
    if(this.dialogConfig.data.objectToEdit) { 
      this.isEdit = true;
      let updatePayload = {
        cbHost: this.dialogConfig.data.objectToEdit.cbHost,
        resource: this.dialogConfig.data.objectToEdit.resource, 
        attributes: this.dialogConfig.data.objectToEdit.attributes,
        internal_attributes: this.dialogConfig.data.objectToEdit.internal_attributes,
        lazy: this.dialogConfig.data.objectToEdit.lazy,
        commands: this.dialogConfig.data.objectToEdit.commands,
        static_attributes: this.dialogConfig.data.objectToEdit.static_attributes
      }
      this.form.controls.configGroup.setValue(JSON.stringify(updatePayload, null, 2));
    }
  }

  onSubmit() {
    this.loading = true;
    if (!this.form.valid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid fields' });
      this.loading = false;
      return;
    }

    let configGroup: any = {};
    const configGroupStr = this.form.controls.configGroup.value;

    if(configGroupStr != null) {
      try {
        configGroup = JSON.parse(configGroupStr);
      } catch (e) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'JSON syntax error' });
      }
    }

    if(this.dialogConfig.data.objectToEdit) {
      this.apiService.editConfigGroup(
        this.dialogConfig.data.objectToEdit.resource,
        this.dialogConfig.data.objectToEdit.apikey,
        configGroup
      ).subscribe(data => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'ConfigGroup updated correctly' });
        this.dialogConfig.data.onClose();
      }, err => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        this.dialogConfig.data.onClose();
      });
    } else {
      this.apiService.createConfigGroup(configGroup).subscribe(data => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'ConfigGroup added correctly' });
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
