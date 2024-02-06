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
    },
    {
      label: "IoTAgent-LWM2M",
      value: "lwm2m", 
    },
    {
      label: "IoTAgent-UL",
      value: "ul", 
    },
    {
      label: "IoTAgent-LoRaWAN",
      value: "lorawan", 
    },
    {
      label: "IoTAgent-OPCUA",
      value: "opcua", 
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
    private sessionService: SessionService) {}

  onSubmit() {
    this.loading = true;
    if(!this.form.valid) {
      this.messageService.add({severity: 'error', summary:  'Error', detail: 'Invalid fields' });
      this.loading = false;
      return;
    }
    const agent = {
      host: this.form.controls.host.value,
      port: this.form.controls.port.value,
      apiKey: this.form.controls.apiKey.value,
      type: this.form.controls.selectedType.value
    };
    const error = this.sessionService.addAgent(agent);
    this.loading = false;
    if(error) {
      this.messageService.add({severity: 'error', summary:  'Error', detail: error.error });
      this.addAgentEventEmitter.emit(agent);
      return;
    }
    this.messageService.add({severity: 'success', summary:  'Success', detail: 'Agent added correctly' });
    this.addAgentEventEmitter.emit(agent);
  }

  onCancel(){
    this.form.reset();
  }

  onTypeChange(event: any) {
    if (event.value.value == "opcua"){
      this.imageSource = "https://github.com/Engineering-Research-and-Development/iotagent-opcua/raw/master/docs/images/iotagent-logo.png"
    }else{
      this.imageSource = "https://i1.wp.com/gelatologia.com/wp-content/uploads/2020/07/placeholder.png"
    }
}

}
