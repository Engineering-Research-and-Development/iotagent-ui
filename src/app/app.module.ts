import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootstrapModule } from './pages/bootstrap/bootstrap.module';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnectionModule } from './pages/connection/connection.module';
import { ServicesModule } from './pages/services/services.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/session/token.interceptor';
import { JsonPipe } from '@angular/common';
import { DevicesModule } from './pages/devices/devices.module';
import { AgentListModule } from './pages/agent-list/agent-list/agent-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AgentListModule,
    BootstrapModule,
    ConnectionModule,
    ServicesModule,
    DevicesModule,
    ToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: JsonPipe }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
