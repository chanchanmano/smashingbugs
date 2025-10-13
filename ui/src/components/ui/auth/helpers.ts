import api from "@/lib/request"
import type { AxiosResponse } from "axios"
import type { Organization } from "./types"
import type { Dispatch, SetStateAction } from "react"

export const getAvailableOrganizations = async (setter:Dispatch<SetStateAction<Organization[]>>): Promise<void> =>{
    const response: AxiosResponse<Organization[]> = await api.get<Organization[]>("api/organizations/")
    setter(response?.data)
}