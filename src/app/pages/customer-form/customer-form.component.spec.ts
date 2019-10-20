import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerFormComponent} from './customer-form.component';
import {ToolbarComponent} from '../../shared/components/toolbar/toolbar.component';
import {ContainerComponent} from '../../shared/components/container/container.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxLoaderIndicatorModule} from 'ngx-loader-indicator';
import {NgxMaskModule} from 'ngx-mask';
import {LocalStorageService} from 'ngx-localstorage';
import {ToastNotificationsModule} from 'ngx-toast-notifications';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NgxLoaderIndicatorModule.forRoot(),
        NgxMaskModule.forRoot(),
        ToastNotificationsModule.forRoot(),
        HttpClientTestingModule
      ],
      declarations: [
        CustomerFormComponent,
        ToolbarComponent,
        ContainerComponent
      ],
      providers: [
        {provide: LocalStorageService, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
