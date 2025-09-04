import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { DevicesComponent } from './devices.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

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
    NgxJsonViewerModule,
    TableModule,
    TagModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    PanelModule,
    DropdownModule,
    FormsModule,
    TooltipModule,
    InputTextModule
  ],
  providers: [
    DialogService
  ]
})
export class DevicesModule { }
