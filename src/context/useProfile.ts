import { useContext } from "react";

import {
  ProfileContext,
  type ProfileContextValue,
} from "./ProfileContextValue";

export const useProfile = (): ProfileContextValue => {
  const context = useContext(ProfileContext);

  if (context === undefined) {
    throw new Error(
      "useProfile must be used inside ProfileProvider",
    );
  }

  return context;
};