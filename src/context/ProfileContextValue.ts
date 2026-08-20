import { createContext } from "react";

import type {
  ProfileFormValues,
  UserProfile,
} from "../types/profile";

export interface ProfileContextValue {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  createProfile: (
    values: ProfileFormValues,
  ) => Promise<void>;
  updateProfile: (
    values: ProfileFormValues,
  ) => Promise<void>;
  deleteProfile: () => Promise<void>;
  loadProfile: () => Promise<void>;
}

export const ProfileContext = createContext<
  ProfileContextValue | undefined
>(undefined);