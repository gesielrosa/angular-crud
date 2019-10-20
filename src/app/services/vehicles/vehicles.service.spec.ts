import {TestBed} from '@angular/core/testing';

import {VehiclesService} from './vehicles.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('VehiclesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', () => {
    const service: VehiclesService = TestBed.get(VehiclesService);
    expect(service).toBeTruthy();
  });

});
