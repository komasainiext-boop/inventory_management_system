import type {
  AuthResponse,
  LoginFormValues,
  RegisterFormValues,
} from '../types/auth';

export const mockAuthResponse: AuthResponse = {
  token: 'mock-auth-token',
  userId: 'user-001',
  email: 'demo@example.com',
};

export const mockRegisteredUser: RegisterFormValues = {
  name: 'Demo User',
  email: 'demo@example.com',
  password: 'Password@123',
  confirmPassword: 'Password@123',
};

export const mockLoginCredentials: LoginFormValues = {
  email: 'demo@example.com',
  password: 'Password@123',
};