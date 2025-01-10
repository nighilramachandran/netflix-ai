export interface AuthProps {
  email: string;
  password: string;
  displayName?: string;
}

export type AuthAction = "login" | "register";

export interface User {
  uid: string | null;
  email: string | null;
  displayName?: string | null;
}
