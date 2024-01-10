import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { DevicesComponent } from './devices.component';



@NgModule({
  declarations: [
    DevicesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CardModule,
    ButtonModule,
    FieldsetModule,
    SplitterModule,
    NgxJsonViewerModule
  ]
})
export class DevicesModule { }
