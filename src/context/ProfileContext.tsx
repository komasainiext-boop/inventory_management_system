import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { mockProfileResponse } from "../stubs/profileStub";
import type { ProfileFormValues, UserProfile } from "../types/profile";

interface ProfileContextValue {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  createProfile: (values: ProfileFormValues) => Promise<void>;
  updateProfile: (values: ProfileFormValues) => Promise<void>;
  deleteProfile: () => Promise<void>;
  loadProfile: () => Promise<void>;
}

interface ProfileProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined,
);

export const ProfileProvider = ({
  children,
}: ProfileProviderProps): React.ReactElement => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 500);
      });

      setProfile(mockProfileResponse.data);
    } catch {
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createProfile = async (values: ProfileFormValues): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 500);
      });

      const newProfile: UserProfile = {
        id: `USR-${Date.now()}`,
        ...values,
      };

      setProfile(newProfile);
    } catch {
      setError("Unable to create profile.");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (values: ProfileFormValues): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 500);
      });

      if (profile === null) {
        throw new Error("Profile does not exist.");
      }

      setProfile({
        ...profile,
        ...values,
      });
    } catch {
      setError("Unable to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 500);
      });

      setProfile(null);
    } catch {
      setError("Unable to delete profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        createProfile,
        updateProfile,
        deleteProfile,
        loadProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextValue => {
  const context = useContext(ProfileContext);

  if (context === undefined) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
};
