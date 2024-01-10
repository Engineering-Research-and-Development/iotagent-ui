import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapComponent } from './pages/bootstrap/bootstrap.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { ServicesComponent } from './pages/services/services.component';
import { DevicesComponent } from './pages/devices/devices.component';

const routes: Routes = [
  { path: '', redirectTo: '/bootstrap', pathMatch: 'full' },
  { path: 'bootstrap', component: BootstrapComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'devices', component: DevicesComponent},
  { path: 'connection', component: ConnectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
