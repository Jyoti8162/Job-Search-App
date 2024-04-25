import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getItem', () => {
    it('should return null if the key does not exist in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      const result = service.getItem('nonexistent-key');

      expect(result).toBeNull();
      expect(localStorage.getItem).toHaveBeenCalledWith('nonexistent-key');
    });

    it('should return the parsed value from localStorage', () => {
      const expectedValue = { foo: 'bar' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(expectedValue));

      const result = service.getItem('some-key');

      expect(result).toEqual(expectedValue);
      expect(localStorage.getItem).toHaveBeenCalledWith('some-key');
    });
  });

  describe('setItem', () => {
    it('should stringify and set the value in localStorage', () => {
      spyOn(localStorage, 'setItem');

      const value = { baz: 'qux' };
      service.setItem('some-key', value);

      expect(localStorage.setItem).toHaveBeenCalledWith('some-key', JSON.stringify(value));
    });
  });
});