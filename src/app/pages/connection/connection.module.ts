import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionComponent } from './connection.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    ConnectionComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    SplitterModule,
    NgxJsonViewerModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
  ],
  exports: [
  ]
})
export class ConnectionModule { }
