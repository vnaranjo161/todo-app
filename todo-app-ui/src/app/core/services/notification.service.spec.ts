import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: {
    mixin: jest.fn(() => ({ fire: jest.fn() })),
  },
}));

import Swal from 'sweetalert2';

describe('NotificationService', () => {
  let service: NotificationService;
  let toastFire: jest.Mock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
    toastFire = (Swal.mixin as jest.Mock).mock.results[0].value.fire;
    toastFire.mockClear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call Toast.fire with success icon and message', () => {
    service.show('Operación exitosa', 'success');
    expect(toastFire).toHaveBeenCalledWith({ icon: 'success', title: 'Operación exitosa' });
  });

  it('should call Toast.fire with error icon and message', () => {
    service.show('Algo salió mal', 'error');
    expect(toastFire).toHaveBeenCalledWith({ icon: 'error', title: 'Algo salió mal' });
  });
});
