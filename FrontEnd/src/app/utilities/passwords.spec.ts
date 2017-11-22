import { PasswordService } from './passwords';

describe('PasswordService (utility service)', () => {
  let service: PasswordService;
  beforeEach(() => { service = new PasswordService()});

  it('#obfuscatePassword should return an unreadable mess', () => {
    expect(service.obfuscatePassword("password")).toBe('5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');
  });

  it('#checkPasswordStrength should return 0 for password', () => {
    expect(service.checkPasswordStrength("password")).toBe(0);
  });

  it('#checkPasswordStrength should return 1 for spectacular', () => {
    expect(service.checkPasswordStrength("spectacular")).toBe(1);
  });

  it('#checkPasswordStrength should return 2 for Spectacular', () => {
    expect(service.checkPasswordStrength("Spectacular")).toBe(2);
  });

  it('#checkPasswordStrength should return 3 for Spectacular1', () => {
    expect(service.checkPasswordStrength("Spectacular1")).toBe(3);
  });

  it('#checkPasswordStrength should return 4 for Spectacular1!', () => {
    expect(service.checkPasswordStrength("Spectacular1!")).toBe(4);
  });
});
