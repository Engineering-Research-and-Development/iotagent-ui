import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})

export class AddAgentComponent {
  @Output() addAgentEventEmitter = new EventEmitter<any>();

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
    selectedType: new FormControl(null, [
      Validators.required
    ]),
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
    const selectedAgentType: any = this.form.controls.selectedType.value;
    if (selectedAgentType) {
      const index = this.agentTypes.findIndex((e: any) => e.value === selectedAgentType.value);
      const agent = {
        host: this.form.controls.host.value,
        port: this.form.controls.port.value,
        apiKey: this.form.controls.apiKey.value,
        type: this.agentTypes[index].value,
        img: this.agentTypes[index].img
      };
      const error = this.sessionService.addAgent(agent);
      this.loading = false;
      if (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        this.addAgentEventEmitter.emit(agent);
        return;
      }
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Agent added correctly' });
      this.addAgentEventEmitter.emit(agent);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "No agent type was selected" });
    }
  }

  onCancel() {
    this.form.reset();
    this.addAgentEventEmitter.emit();
  }

  onTypeChange(event: any) {
    const index = this.agentTypes.findIndex((t: any) => t.value === event.value.value);
    this.imageSource = this.agentTypes[index].img;
  }

}
