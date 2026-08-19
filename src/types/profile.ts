export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

export interface ProfileApiResponse {
  data: UserProfile;
  message: string;
}