import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddConfigGroupComponent } from 'src/app/components/add-config-group/add-config-group.component';
import { ApiService } from 'src/app/services/api/api.service';
import { AgentService } from 'src/app/services/agent/agent.service';
import { ConfirmationService } from 'primeng/api';
import { saveAs } from "file-saver";
import { AttributesComponent } from 'src/app/components/attributes/attributes.component';
import MindElixir, { MindElixirData, MindElixirInstance, NodeObj, Options } from 'mind-elixir'

@Component({
  selector: 'app-config-groups',
  templateUrl: './config-groups.component.html',
  styleUrls: ['./config-groups.component.scss'],
  providers: [ConfirmationService]
})
export class ConfigGroupsComponent {
  attributesDialogRef: DynamicDialogRef | undefined;


  mode: string = '';
  configGroups: any = null;
  showedConfigGroup: any = null;
  selectedConfigGroup: any = null;

  resources: string[] = [];
  entityTypes: string[] = [];
  selectedResource: any = null;
  data: any = null;

  loading = false;

  constructor(private apiService: ApiService,
    private agentService: AgentService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService) {
      this.getConfigGroups();
  }

  getConfigGroups() {
    this.loading = true;
    this.agentService.getConfigGroups().subscribe((data: any) => {
      this.configGroups = data;
      this.showedConfigGroup = this.configGroups.services;
      this.initResourcesList();
      this.initEntityTypeList();
      let previouslySelectedGroup = null;
      if(this.data != null){
        previouslySelectedGroup = this.data.groupToEdit;
        this.data = null;
      }
      if(this.configGroups.services.length === 0){
        this.data = {
          presetResources: this.resources,
          operationType: 'Add',
          groupToEdit: null,
          groupNumber: this.configGroups.services.length,
          entityTypes: this.entityTypes
        }
        this.mode = 'add/edit';
      }else{
        this.mode = 'view';
      }
      if(previouslySelectedGroup === null){
        this.selectedConfigGroup = null;
      }
      this.loading = false;
    }, (err: any) => {
      this.messageService.add({severity: 'error', summary:  'Error', detail: err?.error?.message });
      this.loading = false;
    });
  }


  initResourcesList() {
    this.selectedResource = null;
    this.resources = [];
    for(let configGroup of this.configGroups.services){
      if(this.resources.indexOf(configGroup.resource) == -1){
        this.resources.push(configGroup.resource);
      }
    }
  }

  initEntityTypeList() {
    this.entityTypes = [];
    for(let configGroup of this.configGroups.services){
      if(this.entityTypes.indexOf(configGroup.entity_type) == -1){
        this.entityTypes.push(configGroup.entity_type);
      }
    }
  }

  searchConfigGroupByResource(){
    if(this.selectedResource === null){
      return;
    }else{
      let elem = document.getElementById("filter_apikey");
      let searchApikeyValue = (elem as HTMLInputElement).value;
      if(searchApikeyValue.length > 2){
        this.showedConfigGroup = this.configGroups.services.filter((configGroup: any) => configGroup.apikey.toLowerCase().includes(searchApikeyValue.toLowerCase()) && configGroup.resource === this.selectedResource);
      }else{
        this.showedConfigGroup = this.configGroups.services.filter((configGroup: any) => configGroup.resource === this.selectedResource);
      }      
    }
  }

  OnSelectedConfigGroup(configGroup: any){
    if(this.selectedConfigGroup != null && this.selectedConfigGroup.apikey === configGroup.apikey){
      this.selectedConfigGroup = null;
    }else{
      this.selectedConfigGroup = configGroup;
    }
  }

  interactiveSearchConfigGroup(apikey: any){
    if(apikey.length > 2){
      this.searchConfigGroup(apikey);
    } else if(apikey.length === 0 && this.selectedResource != null){
      this.showedConfigGroup = this.configGroups.services.filter((configGroup: any) => configGroup.resource === this.selectedResource);
    } else if(apikey.length === 0 && this.selectedResource === null){
      this.showedConfigGroup = this.configGroups.services;
    }
  }

  searchConfigGroup(apikey: any){
    if(apikey.length > 0){
      if(this.selectedResource === null){
        this.showedConfigGroup = this.configGroups.services.filter((configGroup: any) => configGroup.apikey.toLowerCase().includes(apikey.toLowerCase()));
      }else{
        this.showedConfigGroup = this.configGroups.services.filter((configGroup: any) => configGroup.apikey.toLowerCase().includes(apikey.toLowerCase()) && configGroup.resource === this.selectedResource);
      }
    }
  }

  refreshConfigGroupFilter(){
    let elem = document.getElementById("filter_apikey");
    (elem as HTMLInputElement).value = '';
    this.showedConfigGroup = this.configGroups.services;
  }

  refreshFilters(){
    this.refreshConfigGroupFilter();
    this.selectedResource = null;
  }

  totalReset(){
    this.refreshFilters();
    this.selectedConfigGroup = null;
  }

  downloadJsonConfiguration(){
    const data = new Blob([JSON.stringify(this.configGroups)], {type: "application/json;charset=utf-8"});
    saveAs(data, "Config Group Configuration.json");
  }

  editConfigGroup(configGroup: any) {
    this.data = {
      presetResources: this.resources,
      operationType: 'Edit',
      groupToEdit: configGroup,
      groupNumber: this.configGroups.services.length,
      entityTypes: this.entityTypes
    };
    this.mode = 'add/edit';
  }

  deleteConfigGroup(configGroup: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete config group',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.agentService.removeConfigGroup(configGroup.resource, configGroup.apikey).subscribe(data => {
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
    this.data = {
      presetResources: this.resources,
      operationType: 'Add',
      groupToEdit: null,
      groupNumber: this.configGroups.services.length,
      entityTypes: this.entityTypes
    };
    this.mode = 'add/edit';
  }

  onCloseAddConfigGroup(event: any) {
    this.getConfigGroups();
    this.mode = 'view';
  }

  onOpenAttributes(configGroup: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Config Group attributes', data: {
      data: configGroup.attributes,
      onClose: () => {  }
    }});
  }

  onOpenLazy(configGroup: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Config Group lazy attributes', data: {
      data: configGroup.lazy,
      onClose: () => {  }
    }});
  }

  onOpenCommands(configGroup: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Config Group commands', data: {
      data: configGroup.commands,
      onClose: () => {  }
    }});
  }

  onOpenStaticAttributes(configGroup: any) {
    this.attributesDialogRef = this.dialogService.open(AttributesComponent, { header: 'Config Group static attributes', data: {
      data: configGroup.static_attributes,
      onClose: () => {  }
    }});
  }
}
