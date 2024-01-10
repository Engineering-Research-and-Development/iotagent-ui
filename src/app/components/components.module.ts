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

@NgModule({
  declarations: [
    MainSidebarComponent,
    GlobalInputComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    DividerModule,
    MenuModule,
    ConfirmDialogModule,
    BreadcrumbModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    FieldsetModule
  ],
  exports: [
    MainSidebarComponent,
    GlobalInputComponent
  ]
})
export class ComponentsModule { }
