import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})

export class AddAgentComponent implements OnInit {

  isEdit = false;

  imageSource: any = "https://i1.wp.com/gelatologia.com/wp-content/uploads/2020/07/placeholder.png"

  agentTypes: any = [
    {
      label: "IoTAgent-JSON",
      value: "json",
      img: "https://i1.wp.com/gelatologia.com/wp-content/uploads/2020/07/placeholder.png"
    },
    {
      label: "IoTAgent-LWM2M",
      value: "lwm2m",
      img: "https://i1.wp.com/gelatologia.com/wp-content/uploads/2020/07/placeholder.png"
    },
    {
      label: "IoTAgent-UL",
      value: "ul",
      img: "https://i1.wp.com/gelatologia.com/wp-content/uploads/2020/07/placeholder.png"
    },
    {
      label: "IoTAgent-LoRaWAN",
      value: "lorawan",
      img: "https://i1.wp.com/gelatologia.com/wp-content/uploads/2020/07/placeholder.png"
    },
    {
      label: "IoTAgent-OPCUA",
      value: "opcua",
      img: "https://github.com/Engineering-Research-and-Development/iotagent-opcua/raw/master/docs/images/iotagent-logo.png"
    },
    {
      label: "IoTAgent-AAS",
      value: "aas",
      img: "https://github.com/Engineering-Research-and-Development/iotagent-aas/raw/master/docs/images/iotagent-logo.png"
    }
  ];

  form = new FormGroup({
    _id: new FormControl(null, []),
    host: new FormControl(null, [
      Validators.required
    ]),
    port: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]{4,5}$")
    ]),
    apiKey: new FormControl(null, [
      Validators.required
    ]),
    type: new FormControl(null, [
      Validators.required
    ]),
  });
  loading: boolean = false;

  constructor(private messageService: MessageService,
    private apiService: ApiService,
    private dialogConfig: DynamicDialogConfig) {

    }

  ngOnInit() {
    if(this.dialogConfig.data.objectToEdit) {
      this.isEdit = true;
      this.form.controls._id.setValue(this.dialogConfig.data.objectToEdit._id);
      this.form.controls.apiKey.setValue(this.dialogConfig.data.objectToEdit.apiKey);
      this.form.controls.host.setValue(this.dialogConfig.data.objectToEdit.host);
      this.form.controls.port.setValue(this.dialogConfig.data.objectToEdit.port);
      this.form.controls.type.setValue(this.dialogConfig.data.objectToEdit.type);
    }
  }

  onSubmit() {
    this.loading = true;
    if (!this.form.valid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid fields' });
      this.loading = false;
      return;
    }
    const selectedAgentType: any = this.form.controls.type.value;
    if (selectedAgentType) {
      const index = this.agentTypes.findIndex((e: any) => e.value === selectedAgentType);
      const agent = {
        _id: this.form.controls._id.value,
        host: this.form.controls.host.value,
        port: this.form.controls.port.value,
        apiKey: this.form.controls.apiKey.value,
        type: this.form.controls.type.value,
        img: this.agentTypes[index].img
      };
      let error: any = null;
      if(this.dialogConfig.data.objectToEdit) {
        error = this.apiService.updateAgent(agent).subscribe(data => {
          this.form.reset();
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Agent updated correctly' });
          this.dialogConfig.data.onClose();
        }, error => {
          this.form.reset();
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          this.dialogConfig.data.onClose();
        });
      } else {
        this.apiService.addAgent(agent).subscribe(data => {
          this.form.reset();
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Agent added correctly' });
          this.dialogConfig.data.onClose();
        }, error => {
          this.form.reset();
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          this.dialogConfig.data.onClose();
        });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "No agent type was selected" });
    }
  }

  onCancel() {
    this.form.reset();
    this.dialogConfig.data.onClose();
  }

  onTypeChange(event: any) {
    const index = this.agentTypes.findIndex((t: any) => t.value === event.value);
    this.imageSource = this.agentTypes[index].img;
  }

}
