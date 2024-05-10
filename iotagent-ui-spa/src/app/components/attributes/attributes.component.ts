import { Component, Input } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent {
  
  data: any;

  constructor(private dialogConfig: DynamicDialogConfig) {
    this.data = this.dialogConfig.data.data;
  }

}
