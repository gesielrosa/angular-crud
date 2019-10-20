import {TestBed} from '@angular/core/testing';

import {CustomersService} from './customers.service';
import {LocalStorageService} from 'ngx-localstorage';

describe('CustomersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: LocalStorageService, useValue: {}}
    ]
  }));

  it('should be created', () => {
    const service: CustomersService = TestBed.get(CustomersService);
    expect(service).toBeTruthy();
  });
});
