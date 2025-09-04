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
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';

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
    TableModule,
    ToolbarModule,
    ConfirmDialogModule,
    DialogModule,
    PanelModule,
    DropdownModule,
    FormsModule,
    TooltipModule,
    TagModule,
    InputTextModule
  ],
  providers: [
    DialogService
  ]
})
export class ConfigGroupsModule { }
