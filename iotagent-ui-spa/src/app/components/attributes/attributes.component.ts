import { Component, Input } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent {
  
  data: any;
  showedData: any;

  constructor(private dialogConfig: DynamicDialogConfig) {
    this.data = this.dialogConfig.data.data;
    this.showedData = this.data;
  }

  searchAttribute(attribute: any){
    if(attribute.length > 0){
      this.showedData = this.data.filter((attr: any) => attr.name.toLowerCase().includes(attribute.toLowerCase()));
    }else{
      this.refreshData();
    }
  }

  interactiveSearchAttribute(attribute: any){
    if(attribute.length > 2){
      this.searchAttribute(attribute);
    }else if(attribute.length === 0){
      this.refreshData();
    }
  }

  refreshData(){
    let elem = document.getElementById("filter_attribute");
    (elem as HTMLInputElement).value = '';
    this.showedData = this.data;
  }

  refreshAttributeFilter(){
    this.refreshData();
  }

}
