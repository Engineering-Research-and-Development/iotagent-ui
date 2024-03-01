import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigGroupsComponent } from './config-groups.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    ConfigGroupsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CardModule,
    ButtonModule,
    FieldsetModule,
    SplitterModule,
    NgxJsonViewerModule,
    TableModule
  ]
})
export class ConfigGroupsModule { }
