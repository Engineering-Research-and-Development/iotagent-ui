import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './pages/services/services.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { AgentListComponent } from './pages/agent-list/agent-list/agent-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/agent-list', pathMatch: 'full' },
  { path: 'agent-list', component: AgentListComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'devices', component: DevicesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
