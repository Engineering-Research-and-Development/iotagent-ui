import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './pages/devices/devices.component';
import { AgentListComponent } from './pages/agent-list/agent-list/agent-list.component';
import { ConfigGroupsComponent } from './pages/config-groups/config-groups.component';
import { LoginComponent } from './pages/login/login.component';
import {AuthGuard} from "./guard/auth.guard";
import {environment} from "./environment";

const routes: Routes = [
  { path: '', redirectTo: '/agent-list', pathMatch: 'full'},
  { path: 'agent-list', component: AgentListComponent, canActivate: environment.KEYCLOAK_URL ? [AuthGuard] : []},
  { path: 'devices', component: DevicesComponent, canActivate: environment.KEYCLOAK_URL ? [AuthGuard] : []},
  { path: 'config-groups', component: ConfigGroupsComponent, canActivate: environment.KEYCLOAK_URL ? [AuthGuard] : []},
];
routes.push(environment.KEYCLOAK_URL ?
  { path: 'login', redirectTo: '/agent-list'} : { path: 'login', component: LoginComponent});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
