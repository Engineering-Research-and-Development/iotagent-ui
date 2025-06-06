import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
    ConfirmDialogModule,
    BreadcrumbModule,
  ]
})
export class UnauthorizedModule { }
