import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AttributesComponent } from 'src/app/components/attributes/attributes.component';
import { SessionService } from 'src/app/services/session/session.service';
import { ConfirmationService } from 'primeng/api';
import { AgentService } from 'src/app/services/agent/agent.service';
import { saveAs } from "file-saver";
import MindElixir, { MindElixirData, MindElixirInstance, NodeObj, Options } from 'mind-elixir'

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  providers: [ConfirmationService]
})
export class DevicesComponent {
  attributesDialogRef: DynamicDialogRef | undefined;
  
  mode: string = '';

  loading = false;

  devices: any = null;
  showedDevices: any = null;
  selectedDevice: any = null;
  data: any = null;

  entityTypes: string[] = [];
  selectedType: any = null;

  showedLayout = 'Hierarchical';
  mind: any;

  constructor(private sessionService: SessionService,
              private agentService: AgentService,
              private messageService: MessageService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
      if(this.sessionService.checkSession()) {
        this.getDevices();
      }
  }

  getDevices() {
    this.agentService.getDevices(null, null).subscribe((data: any) => {
      this.devices = data;
      this.showedDevices = this.devices.devices;
      this.initDeviceTypesList();
      let previouslySelectedDevice = null;
      if(this.data != null){
        previouslySelectedDevice = this.data.deviceToEdit;
        this.data = null;
      }
      if(this.devices.devices.length === 0){
        this.data = {
          presetTypes: this.entityTypes,
          operationType: 'Add',
          deviceToEdit: null,
          deviceNumber: this.devices.devices.length
        }
        this.mode = 'add/edit';
      }else{
        this.mode = 'view';
      }
      if(previouslySelectedDevice === null){
        this.selectedDevice = null;
      }
      if(this.showedLayout === 'mindmap'){
        this.initMindMap();
      }
      this.loading = false;
    }, (err: any) => {
      this.messageService.add({severity: 'error', summary:  'Error', detail: err?.error?.message });
      this.loading = false;
    });
  }

  initDeviceTypesList(){
    this.selectedType = null;
    this.entityTypes = [];
    for(let device of this.devices.devices){
      if(this.entityTypes.indexOf(device.entity_type) == -1){
        this.entityTypes.push(device.entity_type);
      }
    }
  }

  searchDeviceBytype(){
    if(this.selectedType === null){
      return;
    }else{
      let elem = document.getElementById("filter_device");
      let searchDeviceValue = (elem as HTMLInputElement).value;
      if(searchDeviceValue.length > 2){
        this.showedDevices = this.devices.devices.filter((device: any) => device.device_id.toLowerCase().includes(searchDeviceValue.toLowerCase()) && device.entity_type === this.selectedType);
      }else{
        this.showedDevices = this.devices.devices.filter((device: any) => device.entity_type === this.selectedType);
      }      
    }
  }

  OnSelectedDevice(device: any){
    if(this.selectedDevice != null && this.selectedDevice.device_id === device.device_id){
      this.selectedDevice = null;
    }else{
      this.selectedDevice = device;
    }
  }

  searchDevice(deviceId: any){
    if(deviceId.length > 0){
      if(this.selectedType === null){
        this.showedDevices = this.devices.devices.filter((device: any) => device.device_id.toLowerCase().includes(deviceId.toLowerCase()));
      }else{
        this.showedDevices = this.devices.devices.filter((device: any) => device.device_id.toLowerCase().includes(deviceId.toLowerCase()) && device.entity_type === this.selectedType);
      }
    }
  }

  refreshFilters(){
    this.refreshDevicesFilter();
    this.selectedType = null;
  }

  totalReset(){
    this.refreshFilters();
    this.selectedDevice = null;
  }

  interactiveSearchDevice(deviceId: any){
    if(deviceId.length > 2){
      this.searchDevice(deviceId);
    } else if(deviceId.length === 0 && this.selectedType != null){
      this.showedDevices = this.devices.devices.filter((device: any) => device.entity_type === this.selectedType);
    } else if(deviceId.length === 0 && this.selectedType === null){
      this.showedDevices = this.devices.devices;
    }
  }

  refreshDevicesFilter(){
    let elem = document.getElementById("filter_device");
    (elem as HTMLInputElement).value = '';
    this.showedDevices = this.devices.devices;
  }

  downloadJsonConfiguration(){
    const data = new Blob([JSON.stringify(this.devices)], {type: "application/json;charset=utf-8"});
    saveAs(data, "Device Configuration.json");
  }

  onOpenAttributes(device: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Device Active Attributes', data: {
      data: device.attributes,
      onClose: () => {  }
    }});
  }

  onOpenLazy(device: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Device Lazy Attributes', data: {
      data: device.lazy,
      onClose: () => {  }
    }});
  }

  onOpenCommands(device: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Device Commands', data: {
      data: device.commands,
      onClose: () => {  }
    }});
  }

  onOpenStaticAttributes(device: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Device Static Attributes', data: {
      data: device.static_attributes,
      onClose: () => {  }
    }});
  }

  changeLayout(){
    this.selectedDevice = null;
    if(this.showedLayout === 'Hierarchical'){
      this.selectedType = null;
      this.showedDevices = this.devices.devices;
      this.showedLayout = "mindmap";
      setTimeout(() => {
        const el = document.getElementById('map');
        if(el && el.offsetWidth > 0 && el.offsetHeight > 0){
          this.initMindMap();
        }
      }, 100);      
    }else{
      this.showedLayout = 'Hierarchical';
    }
  }

  onAddDevice() {
    this.data = {
      presetTypes: this.entityTypes,
      operationType: 'Add',
      deviceToEdit: null,
      deviceNumber: this.devices.devices.length
    };
    this.mode = 'add/edit';
  }

  editDevice(device: any) {
    this.data = {
      presetTypes: this.entityTypes,
      operationType: 'Edit',
      deviceToEdit: device,
      deviceNumber: this.devices.devices.length
    };
    this.mode = 'add/edit';
  }

  deleteDevice(device: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Device',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.agentService.removeDevice(device.device_id).subscribe(data => {
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

  onCloseAddDevice(event: any) {
    this.getDevices();
    this.mode = 'view';
  }


// Mind Map Generation

  initMindMap(){
    const mindmapData = this.convertToMindElixirFormat();
    this.mind = new MindElixir({
      el: '#map',
      direction: MindElixir.RIGHT,
      draggable: false, 
      contextMenu: false, 
      toolBar: true, 
      keypress: false, 
    });
    this.mind.init(mindmapData);
    this.mind.bus.addListener('selectNode', (node: NodeObj) => {
      if(this.selectedDevice != null && this.selectedDevice.device_id === node.topic){
        this.selectedDevice = null;
        return;
      }
      let device = this.devices.devices.find((device: any) => device.device_id === node.topic);
      if(device){
        this.selectedDevice = device;
      }else{
        this.selectedDevice = null;
      }
    });
  }

  convertToMindElixirFormat() {
    const root = this.createNode(`Root (Total: ${this.devices.count})`);

    // Raggruppa per entity_type
    const grouped = {};
    this.devices.devices.forEach((device:any) => {
      const type = device.entity_type;
      if (!(grouped as any)[type]) (grouped as any)[type] = [];
      (grouped as any)[type].push(device);
    });

    Object.keys(grouped).forEach((entity_type: string) => {
    const entityNode = this.createNode(entity_type);

      (grouped as any)[entity_type].forEach((device:any) => {
        const deviceNode: any = this.createNode(device.entity_name);

        // Proprietà principali
        ["apikey", "service", "service_path"].forEach(prop => {
          deviceNode.children.push(this.createNode(`${prop}: ${device[prop] || "-"}`, []));
        });

        // Attributi
        ["attributes", "lazy", "static_attributes", "commands"].forEach(category => {
          const items = device[category];
          if (items && items.length > 0) {
            let topic;
            if(category === 'attributes'){
              topic = 'active';
            }else if (category === 'static_attributes'){
              topic = 'static';
            }else{
              topic = category;
            }
            const catNode = this.createNode(topic);
            items.forEach((attr: any) => {
              catNode.children.push(this.createNode(attr.name || "-", []));
            });
            deviceNode.children.push(catNode);
          }
        });

        entityNode.children.push(deviceNode);
      });

      root.children.push(entityNode);
    });

    return { nodeData: root };
  }

  createNode(topic: any, children = [], expanded = false): any {
    return {
      id: this.generateId(),
      topic,
      expanded,
      children
    };
  }

  generateId() {
  // Crea un UUID-like semplificato
    return 'id-' + Math.random().toString(36).substr(2, 9);
  }
}
