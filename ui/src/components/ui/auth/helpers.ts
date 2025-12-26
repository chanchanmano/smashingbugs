import request from "@/lib/request";
import { UserRole, type Organization, type User } from "./types";
import type { Dispatch, SetStateAction } from "react";
import type { JSONValue } from "@/lib/types";
import type { AxiosResponse } from "axios";

export const getAvailableOrganizations = async (
  setter: Dispatch<SetStateAction<Organization[]>>
): Promise<void> => {
  await request.GET<Organization[]>({
    url: "api/organizations/",
    onSuccess: (res) => setter(res.data),
    errorMessage: "Failed to fetch organizations.",
  });
};

export const registerUser = async (data: any): Promise<void> => {
  const orgResponse: AxiosResponse<Organization>  = await request.POST<Organization>({
    url: "api/organizations/",
    data: data.organization,
    errorMessage: "Failed to create organization"
  });

  const orgId: number = orgResponse?.data?.id;
  const userInformation: Partial<User> = {
    name: data?.name,
    email: data?.email,
    password: data?.password,
    role: UserRole.admin,
    organization_id: orgId,
  };

  await request.POST<JSONValue[]>({
    url: "api/users/",
    data: userInformation,
    successMessage: "You have been successfully registered",
    errorMessage: "Something went wrong",
  });
};
