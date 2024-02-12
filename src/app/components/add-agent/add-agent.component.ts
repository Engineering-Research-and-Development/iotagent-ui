import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})

export class AddAgentComponent implements OnInit {

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
    }
  ];

  form = new FormGroup({
    id: new FormControl(null, []),
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
    private sessionService: SessionService,
    private dialogConfig: DynamicDialogConfig) {
      
    }

  ngOnInit() {
    if(this.dialogConfig.data.objectToEdit) {
      this.form.controls.id.setValue(this.dialogConfig.data.objectToEdit.id);
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
        id: this.form.controls.id.value,
        host: this.form.controls.host.value,
        port: this.form.controls.port.value,
        apiKey: this.form.controls.apiKey.value,
        type: this.form.controls.type.value,
        img: this.agentTypes[index].img
      };
      let error: any = null;
      if(this.dialogConfig.data.objectToEdit) {
        error = this.sessionService.editAgent(agent);
      } else {
        error = this.sessionService.addAgent(agent);
      }
      this.form.reset();
      this.loading = false;
      if (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        this.dialogConfig.data.onClose();
        return;
      }
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Agent added correctly' });
      this.dialogConfig.data.onClose();
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
