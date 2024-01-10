import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapComponent } from './bootstrap.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    BootstrapComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule
  ],
  providers: [MessageService],
})
export class BootstrapModule { }
