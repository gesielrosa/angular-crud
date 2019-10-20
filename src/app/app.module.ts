import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgxLoaderIndicatorModule} from 'ngx-loader-indicator';
import {NgxLocalStorageModule} from 'ngx-localstorage';
import {NgxMaskModule} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';
import {TOAST_NOTIFICATIONS_CONFIG, ToastNotificationsModule} from 'ngx-toast-notifications';

import {AppComponent} from './app.component';
import {ContainerComponent} from './shared/components/container/container.component';
import {CustomersComponent} from './pages/customers/customers.component';
import {CustomerFormComponent} from './pages/customer-form/customer-form.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';

import {CustomersService} from './services/customers/customers.service';
import {VehiclesService} from './services/vehicles/vehicles.service';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    CustomersComponent,
    CustomerFormComponent,
    PageNotFoundComponent,
    ToolbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot(),
    NgxLoaderIndicatorModule.forRoot(),
    NgxLocalStorageModule.forRoot(),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    ToastNotificationsModule
  ],
  providers: [
    {provide: TOAST_NOTIFICATIONS_CONFIG, useValue: {duration: 6000, preventDuplicates: true, position: 'bottom-right'}},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    CustomersService,
    VehiclesService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
