import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSidebarComponent } from './main-sidebar/main-sidebar/main-sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { DetailAgentComponent } from './detail-agent/detail-agent.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { AddServiceComponent } from './add-service/add-service.component';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { FocusTrapModule } from 'primeng/focustrap';
import { AttributesComponent } from './attributes/attributes.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    MainSidebarComponent,
    AddAgentComponent,
    DetailAgentComponent,
    AddServiceComponent,
    AttributesComponent,
    AddDeviceComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    DividerModule,
    MenuModule,
    CardModule,
    ConfirmDialogModule,
    BreadcrumbModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    FieldsetModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    DropdownModule,
    ImageModule,
    DialogModule,
    FocusTrapModule,
    InputTextareaModule
  ],
  exports: [
    MainSidebarComponent,
    DetailAgentComponent,
    AddAgentComponent
  ],
  providers: [
    DialogService
  ]
})
export class ComponentsModule { }
