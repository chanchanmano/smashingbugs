import type { JSONValue } from "@/lib/types";

export interface Organization {
    id:number;
    name: string;
    created_at: string;
    updated_at: string;
}

export const UserRole = {
  user: "USER",
  admin: "ADMIN",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string | null;
  date_joined: string;
  created_at: string;
  updated_at: string;
  organization?: JSONValue;
  organization_id?: number;
  password?: string;
}