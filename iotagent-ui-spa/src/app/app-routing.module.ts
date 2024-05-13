import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './pages/devices/devices.component';
import { AgentListComponent } from './pages/agent-list/agent-list/agent-list.component';
import { ConfigGroupsComponent } from './pages/config-groups/config-groups.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/agent-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'agent-list', component: AgentListComponent},
  { path: 'devices', component: DevicesComponent},
  { path: 'config-groups', component: ConfigGroupsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
