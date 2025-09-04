import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/services/api/api.service';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Device, Attribute, StaticAttribute, Command } from 'src/app/models/device.model';
import MindElixir, { MindElixirData, MindElixirInstance, NodeObj, Options } from 'mind-elixir'

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})

export class AddDeviceComponent implements OnInit {

  @Input() data: any = undefined;
  @Output() operationCompleted = new EventEmitter<any>();
  isEdit = false;

  form!: FormGroup;
  loading: boolean = false;
  deviceToEdit: any;
  editableData = ["Active", "Lazy", "Static", "Commands"];
  dataToEditLabel = 'Active';
  dataToEdit: any
  NGSITypes = ["Text", "Number", "Integer", "Float", "Boolean", "DateTime", "StructuredValue", "geo:json", "Relationship"];
  operation: string = '';
  editableRowIndex: number = -1;
  editableRowElement: any;
  editableElementIndex: number = -1;
  rowToDeleteIndex: number = -1;
  deleteElementIndex: number = -1;
  activeTabIndex: number = 0;
  registeringFirstDevice: boolean = true;
  mind: any;
  presetEntityTypes: any = [];
  usePresetEntityTypes: boolean = false;
  noPresetEntityTypes: boolean = false;
  operationType: string = '';
  searchPerformed: boolean = false;

  constructor(private messageService: MessageService,
              private agentService: AgentService,
              private apiService: ApiService,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService
  ) {
      
    }

  ngOnInit() {
    this.deviceToEdit = this.data.deviceToEdit;
    this.registeringFirstDevice = (this.data.deviceNumber === 0);
    this.operationType = this.data.operationType;
    if(this.data.presetTypes.length > 0){
      this.presetEntityTypes = ['',...this.data.presetTypes];
      this.usePresetEntityTypes = true;
    }else{
      this.noPresetEntityTypes = true;
    }
    this.form = this.fb.group({
      device_id: [this.deviceToEdit?.device_id || '',Validators.required],
      apikey: [this.deviceToEdit?.apikey || ''],
      service: [this.deviceToEdit?.service || ''],
      service_path: [this.deviceToEdit?.service_path || ''],
      entity_name: [this.deviceToEdit?.entity_name || '', Validators.required],
      entity_type: [this.deviceToEdit?.entity_type || '', Validators.required],
      endpoint: [this.deviceToEdit?.endpoint || ''],
      attributes: this.fb.array(this.createAttributes(this.deviceToEdit?.attributes)),
      lazy: this.fb.array(this.createAttributes(this.deviceToEdit?.lazy)),
      commands: this.fb.array(this.createCommands(this.deviceToEdit?.commands)),
      static_attributes: this.fb.array(this.createStaticAttributes(this.deviceToEdit?.static_attributes))
    });

    this.dataToEdit = this.attributes;
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  isNotValid(control:AbstractControl): boolean{
    return !!(control.invalid && control.touched);
  }
  
  createAttributes(attrs?: Attribute[]): FormGroup[] {
    return (attrs || []).map(attr =>
      this.fb.group({
        name: [attr.name, Validators.required],
        type: [attr.type, Validators.required],
        object_id: [attr.object_id || '']
      })
    );
  }

  createCommands(cmds?: Command[]): FormGroup[] {
    return (cmds || []).map(cmd =>
      this.fb.group({
        name: [cmd.name, Validators.required],
        type: [cmd.type, Validators.required],
        expression: [cmd.expression]
      })
    );
  }

  createStaticAttributes(attrs?: StaticAttribute[]): FormGroup[] {
    return (attrs || []).map(attr =>
      this.fb.group({
        name: [attr.name, Validators.required],
        type: [attr.type, Validators.required],
        value: [attr.value, Validators.required]
      })
    );
  }

  get attributes(): FormArray {
    return this.form.get('attributes') as FormArray;
  }

  get lazy(): FormArray {
    return this.form.get('lazy') as FormArray;
  }

  get commands(): FormArray {
    return this.form.get('commands') as FormArray;
  }

  get static_attributes(): FormArray {
    return this.form.get('static_attributes') as FormArray;
  }

  AddElement(){
    this.operation = 'Add';
    this.editableRowIndex = 0;
    if(this.dataToEditLabel === 'Active'){
      this.addAttribute();
    }else if(this.dataToEditLabel === 'Lazy'){
      this.addLazyAttribute();
    }else if(this.dataToEditLabel === 'Static'){
      this.addStaticAttribute();
    }else{
      this.addCommand();
    }
  }

  addAttribute(): void {
    this.attributes.insert(0, this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      object_id: ['']
    }));
  }

  addLazyAttribute(): void {
    this.lazy.insert(0, this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      object_id: ['']
    }));
  }

  addStaticAttribute(): void {
    this.static_attributes.insert(0, this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      value: ['', Validators.required]
    }));
  }

  addCommand(): void {
    this.commands.insert(0, this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      expression: ['']
    }));
  }

  editElement(index: number){
    this.operation = 'Edit';
    this.editableRowIndex = index;
    this.editableRowElement = JSON.parse(JSON.stringify(this.dataToEdit.at(this.editableRowIndex).value));
    this.editableElementIndex = this.getIndexFromSourceData(this.editableRowElement);
  }

  getIndexFromSourceData(element: any){
    if(this.dataToEditLabel === 'Active'){
      return this.attributes.controls.findIndex(control => (control.value.name === element.name &&
                                                            control.value.type === element.type));;
    }else if(this.dataToEditLabel === 'Lazy'){
      return this.lazy.controls.findIndex(control => (control.value.name === element.name &&
                                                      control.value.type === element.type));;
    }else if(this.dataToEditLabel === 'Static'){
      return this.static_attributes.controls.findIndex(control => (control.value.name === element.name &&
                                                                  control.value.type === element.type));;
    }else{
      return this.commands.controls.findIndex(control => (control.value.name === element.name &&
                                                          control.value.type === element.type));;
    }
  }

  deleteElement(index: number){
    this.operation = 'Delete';
    this.rowToDeleteIndex = index;
    let deleteRowElement = JSON.parse(JSON.stringify(this.dataToEdit.at(this.rowToDeleteIndex).value));
    this.deleteElementIndex = this.getIndexFromSourceData(deleteRowElement);
  }

  removeAttribute(index: number): void {
    this.attributes.removeAt(index);
  }

  removeLazyAttribute(index: number): void {
    this.lazy.removeAt(index);
  }

  removeStaticAttribute(index: number): void {
    this.static_attributes.removeAt(index);
  }

  removeCommand(index: number): void {
    this.commands.removeAt(index);
  }

  selectEntityTypes(event: any){
    this.usePresetEntityTypes = event.checked;
  }

  cancelAdd(){
    if(this.dataToEditLabel === 'Active'){
      this.removeAttribute(0);
    }else if(this.dataToEditLabel === 'Lazy'){
      this.removeLazyAttribute(0);
    }else if(this.dataToEditLabel === 'Static'){
      this.removeStaticAttribute(0);
    }else{
      this.removeCommand(0);
    }
  }

  cancelOperation(){
    if(this.operation === 'Add'){
      this.cancelAdd();
    } else if(this.operation === 'Edit'){
  
      const copiedGroup = this.fb.group({});
      Object.keys(this.dataToEdit.at(this.editableRowIndex).controls).forEach(key => {
        copiedGroup.addControl(key, this.fb.control(this.editableRowElement[key]));
      });
      this.resetEditableElement(copiedGroup);
      this.dataToEdit.setControl(this.editableRowIndex, copiedGroup);
    }
    this.refreshOperationInfo();
  }

  resetEditableElement(group: AbstractControl){
    if(this.dataToEditLabel === 'Active'){
      this.attributes.setControl(this.editableElementIndex, group);
    }else if(this.dataToEditLabel === 'Lazy'){
      this.lazy.setControl(this.editableElementIndex, group);
    }else if(this.dataToEditLabel === 'Static'){
      this.static_attributes.setControl(this.editableElementIndex, group);
    }else{
      this.commands.setControl(this.editableElementIndex, group);
    }
  }

  saveDelete(){
    if(this.dataToEditLabel === 'Active'){
      this.removeAttribute(this.deleteElementIndex);
    }else if(this.dataToEditLabel === 'Lazy'){
      this.removeLazyAttribute(this.deleteElementIndex);
    }else if(this.dataToEditLabel === 'Static'){
      this.removeStaticAttribute(this.deleteElementIndex);
    }else{
      this.removeCommand(this.deleteElementIndex);
    }
    this.refreshControls();
  }

  hasDuplicates(formArray: FormArray): boolean {
    const seen = new Set<string>();

    for (const control of formArray.controls) {
      const { type, name } = control.value;
      const key = `${type}-${name}`;

      if (seen.has(key)) {
        return true; 
      }

      seen.add(key);
    }

    return false; 
  }

  thereAreDuplicates(){
    if(this.dataToEditLabel === 'Active'){
      return this.hasDuplicates(this.attributes);
    }else if(this.dataToEditLabel === 'Lazy'){
      return this.hasDuplicates(this.lazy);
    }else if(this.dataToEditLabel === 'Static'){
      return this.hasDuplicates(this.static_attributes);
    }else{
      return this.hasDuplicates(this.commands);
    }
  }


  saveOperation(){
    if(this.operation === 'Delete'){
      this.saveDelete();
    }else{
      if (!this.dataToEdit.at(this.editableRowIndex).valid) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid fields' });
        return;
      }
      if(this.thereAreDuplicates()){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Duplicated Attribute' });
        return;
      }
    }
    this.refreshOperationInfo();
  }

  refreshOperationInfo(){
    this.editableRowIndex = -1;
    this.editableElementIndex = -1;
    this.editableRowElement = null;
    this.operation = '';
    this.rowToDeleteIndex = -1;
    this.deleteElementIndex = -1;
  }

  onSubmit() {
    this.loading = true;
    if (!this.form.valid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid fields' });
      this.loading = false;
      return;
    }
    
    if(this.deviceToEdit) {
      this.editDevice();
    } else {
      this.addDevice();
    }
        
  }

  editDevice(){
    const cleanedValue = this.removeEmptyValues(JSON.parse(JSON.stringify(this.form.value)));
    const body = cleanedValue;
    let device_id = body['device_id'];

    delete body['device_id'];
    delete body['service'];
    delete body['service_path'];

    
    this.agentService.editDevice(device_id, body).subscribe(data => {
      this.loading = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Device updated correctly' });
      this.operationCompleted.emit();
    }, err => {
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    });
  }

  addDevice(){
    const cleanedValue = this.removeEmptyValues(this.form.value);

    const body = {
      devices: [cleanedValue]
    }

    this.agentService.createDevice(body).subscribe(data => {
      this.loading = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Device Created Correctly' });
      this.operationCompleted.emit();
    }, err => {
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    });
  }

  
  removeEmptyValues(obj: Record<string, any>): Record<string, any> { 
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) =>value !== '' ));
  }


  onCancel() {
    if(this.registeringFirstDevice){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No device provisioned on the agent, please register the first device' });
      return;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed? You will lose all the information inserted until now',
      header: 'Cancel Operation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.form.reset();
        this.operationCompleted.emit();
      },
      reject: () => {
          return;
      }
    })
    
  }

  changeDataToEdit(event: any){
    this.dataToEditLabel = event.value;
    if(this.dataToEditLabel === 'Active'){
      this.dataToEdit = this.attributes;
    }else if(this.dataToEditLabel === 'Lazy'){
      this.dataToEdit = this.lazy;
    }else if(this.dataToEditLabel === 'Static'){
      this.dataToEdit = this.static_attributes;
    }else{
      this.dataToEdit = this.commands;
    }
  }

  filterGroups(control: any): any{

    let controlsSource;

    if(this.dataToEditLabel === 'Active'){
      controlsSource = this.attributes;
    }else if(this.dataToEditLabel === 'Lazy'){
      controlsSource = this.lazy;
    }else if(this.dataToEditLabel === 'Static'){
      controlsSource = this.static_attributes;
    }else{
      controlsSource = this.commands;
    }

    return controlsSource.controls.filter((group: AbstractControl) => {
      const name = group.get('name')?.value;
      return name?.toLowerCase().includes(control.toLowerCase());
    });
  }

  areDataActuallyFiltered(newData: any){
    if(this.dataToEditLabel === 'Active'){
      return newData.length != this.attributes.length;
    }else if(this.dataToEditLabel === 'Lazy'){
      return newData.length != this.lazy.length;
    }else if(this.dataToEditLabel === 'Static'){
      return newData.length != this.static_attributes.length;
    }else{
      return newData.length != this.commands.length;
    }  
  }

  searchControls(control: any){
    if(control.length > 0){
      const filteredGroups = this.filterGroups(control);
      let newData = new FormArray(filteredGroups as FormGroup[]);
      if(this.areDataActuallyFiltered(newData)){
        this.searchPerformed = true;
        this.dataToEdit = newData;
      }
    }else{
      this.refreshControls();
    }
  }

  interactiveSearchControls(control: any){
    if(control.length > 2){
      this.searchControls(control);
    }else if(control.length === 0){
      this.refreshControls();
    }
  }

  refreshControls(){
    let elem = document.getElementById("filter_controls");
    (elem as HTMLInputElement).value = '';
    if(this.dataToEditLabel === 'Active'){
      this.dataToEdit = this.attributes;
    }else if(this.dataToEditLabel === 'Lazy'){
      this.dataToEdit = this.lazy;
    }else if(this.dataToEditLabel === 'Static'){
      this.dataToEdit = this.static_attributes;
    }else{
      this.dataToEdit = this.commands;
    }
    this.searchPerformed = false;
  }

  refreshControlsFilter(){
    this.refreshControls();
  }

  nextTab(){
    this.activeTabIndex++;
  }

  previousTab(){
    this.activeTabIndex--;
  }

  hasAtLeastOneContextInformation(): boolean{

    const deviceConfiguration = this.form.value;

    const hasAtLeastOne = deviceConfiguration.attributes.length > 0 ||
                          deviceConfiguration.lazy.length > 0 ||
                          deviceConfiguration.commands.length > 0 ||
                          deviceConfiguration.static_attributes.length > 0;

    return hasAtLeastOne;
  }

  areMetadataInserted(): boolean{
    
    const areMetadataInserted = !(this.form.get('device_id')?.invalid) &&
                                !(this.form.get('entity_name')?.invalid) &&
                                !(this.form.get('entity_type')?.invalid);
    return areMetadataInserted;
  }

  isSummaryAvailable(): boolean{
    return this.operation.length === 0 && this.hasAtLeastOneContextInformation() && this.areMetadataInserted();
  }

  onTabChange(event: any) {
    if (this.activeTabIndex === 2) {
      let attempts = 0;
      const intervalId = setInterval(() => {
        const el = document.getElementById('map');
        if (el && el.offsetWidth > 0 && el.offsetHeight > 0) {
            this.initMindMap(); 
            clearInterval(intervalId);
        } else {
            attempts++;
            if (attempts < 15) {
                console.warn(`Map not ready`);
            } else {
                console.error('Map not available');
                clearInterval(intervalId);
            }
        }
      }, 2000);
    }
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

  }

  convertToMindElixirFormat() {
    const deviceConfiguration = this.form.value;
    const root = this.createNode(`${deviceConfiguration.device_id}`);
    
    Object.keys(deviceConfiguration).forEach((configurationElement: string) => {
      if(Array.isArray(deviceConfiguration[configurationElement])){
        const elementNode = this.createNode(configurationElement);
        const items = deviceConfiguration[configurationElement];
        if (items && items.length > 0) {
          items.forEach((attribute: any) => {
            const attrNode = this.createNode(attribute.name);
            Object.keys(attribute).forEach((attributeProperty: string)=> {
              if(attribute[attributeProperty]){
                attrNode.children.push(this.createNode(`${attributeProperty}: ${attribute[attributeProperty]}`, []));
              }
            })
            elementNode.children.push(attrNode);
          });
          root.children.push(elementNode);
        }
      }else{
        if(configurationElement != 'device_id'){
          if(deviceConfiguration[configurationElement] ){
            const elementNode = this.createNode(`${configurationElement}: ${deviceConfiguration[configurationElement]}`, []);
            root.children.push(elementNode);
          }
        }
      }
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
