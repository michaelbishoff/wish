// This is likely not necessary

import { User } from "firebase/auth";
import { createContext, useContext } from "react";

const UserContext = createContext<{ user: User } | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "UserContext.* component must be rendered as a child of UserContext component"
    );
  }
  return context;
}
