import { useCallback, useMemo, useState, type ReactNode } from "react";

import { mockProfileResponse } from "../stubs/profileStub";
import type { ProfileFormValues, UserProfile } from "../types/profile";

import { ProfileContext } from "./ProfileContextValue";

interface ProfileProviderProps {
  children: ReactNode;
}

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

  const createProfile = useCallback(
    async (values: ProfileFormValues): Promise<void> => {
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
    },
    [],
  );

  const updateProfile = useCallback(
    async (values: ProfileFormValues): Promise<void> => {
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
    },
    [profile],
  );

  const deleteProfile = useCallback(async (): Promise<void> => {
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
  }, []);

  const contextValue = useMemo(
    () => ({
      profile,
      loading,
      error,
      createProfile,
      updateProfile,
      deleteProfile,
      loadProfile,
    }),
    [
      profile,
      loading,
      error,
      createProfile,
      updateProfile,
      deleteProfile,
      loadProfile,
    ],
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};
