import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentListComponent } from './agent-list.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ComponentsModule } from "../../../components/components.module";
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [
        AgentListComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        ComponentsModule,
        DialogModule
    ]
})
export class AgentListModule { }
