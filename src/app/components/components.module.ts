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
import { GlobalInputComponent } from './global-input/global-input.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { DetailAgentComponent } from './detail-agent/detail-agent.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    MainSidebarComponent,
    GlobalInputComponent,
    AddAgentComponent,
    DetailAgentComponent
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
    ImageModule
  ],
  exports: [
    MainSidebarComponent,
    GlobalInputComponent,
    DetailAgentComponent,
    AddAgentComponent
  ]
})
export class ComponentsModule { }
