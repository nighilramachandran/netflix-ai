export interface LoginProps {
  email: string;
  password: string;
}

export interface User {
  uid: string | null;
  email: string | null;
  displayName?: string | null;
}
