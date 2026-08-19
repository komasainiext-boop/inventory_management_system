export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string;
}

export interface ProfileApiResponse {
  success: boolean;
  data: UserProfile;
  message: string;
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string;
}