import type { ProfileApiResponse } from '../types/profile';

export const mockProfileResponse: ProfileApiResponse = {
  success: true,
  message: 'Profile retrieved successfully',
  data: {
    id: 'USR-001',
    firstName: 'Inventory',
    lastName: 'Manager',
    email: 'manager@example.com',
    phone: '+91 9876543210',
    role: 'Inventory Manager',
    avatarUrl: '',
  },
};
