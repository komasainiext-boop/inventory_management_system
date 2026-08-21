import { useCallback, useMemo, useState, type ReactNode } from "react";

import type { ProfileFormValues, UserProfile } from "../types/profile";

import { ProfileContext } from "./ProfileContextValue";

interface ProfileProviderProps {
  children: ReactNode;
}

const PROFILE_STORAGE_KEY = "inventory_user_profile";

const readProfileFromStorage = (): UserProfile | null => {
  const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

  console.log("PROFILE STORAGE VALUE:", storedProfile);

  if (storedProfile === null) {
    return null;
  }

  try {
    return JSON.parse(storedProfile) as UserProfile;
  } catch {
    console.error("Invalid profile data in localStorage.");
    return null;
  }
};

export const ProfileProvider = ({
  children,
}: ProfileProviderProps): React.ReactElement => {
  const [profile, setProfile] = useState<UserProfile | null>(() =>
    readProfileFromStorage(),
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 300);
      });

      const storedProfile = readProfileFromStorage();

      console.log("PROFILE LOADED:", storedProfile);

      setProfile(storedProfile);
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
          window.setTimeout(resolve, 300);
        });

        const newProfile: UserProfile = {
          id: `USR-${Date.now()}`,
          ...values,
        };

        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));

        setProfile(newProfile);

        console.log("PROFILE CREATED:", newProfile);
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
          window.setTimeout(resolve, 300);
        });

        const currentProfile = readProfileFromStorage();

        if (currentProfile === null) {
          throw new Error("Profile does not exist.");
        }

        const updatedProfile: UserProfile = {
          ...currentProfile,
          ...values,
        };

        localStorage.setItem(
          PROFILE_STORAGE_KEY,
          JSON.stringify(updatedProfile),
        );

        setProfile(updatedProfile);

        console.log("PROFILE UPDATED:", updatedProfile);
        console.log(
          "PROFILE SAVED:",
          localStorage.getItem(PROFILE_STORAGE_KEY),
        );
      } catch {
        setError("Unable to update profile.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteProfile = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 300);
      });

      localStorage.removeItem(PROFILE_STORAGE_KEY);

      setProfile(null);

      console.log("PROFILE DELETED");
      console.log(
        "PROFILE AFTER DELETE:",
        localStorage.getItem(PROFILE_STORAGE_KEY),
      );
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
