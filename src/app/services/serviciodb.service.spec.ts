import { TestBed } from '@angular/core/testing';

import { ServiciodbService } from '../../../services/serviciodb.service';

describe('ServiciodbService', () => {
  let service: ServiciodbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciodbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
