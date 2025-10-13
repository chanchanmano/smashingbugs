import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { Organization } from "./types";
import { getAvailableOrganizations } from "./helpers";
import { OrganizationCombobox } from "./OrganizationCombobox"; // <-- use the new component

const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }), // <-- fixed
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  organization: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
    })
    .refine((val) => val.id || val.name, {
      message: "Please select or create an organization",
    }),
});

type RegisterFormData = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      organization: { id: "", name: "" },
    },
  });

  useEffect(() => {
    (async () => {
      try {
        await getAvailableOrganizations(setOrganizations);
      } catch (err) {
        console.error("Error fetching organizations:", err);
      }
    })();
  }, []);

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label>Name</Label>
        <Input {...form.register("name")} className="bg-white text-black" />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Organization */}
      <div className="space-y-2">
        <Label>Organization</Label>
        <OrganizationCombobox
          form={form}
          organizations={organizations}
          namePath="organization"
          placeholder="Search or create organization"
        />
        {form.formState.errors.organization && (
          <p className="text-sm text-red-500">
            {String(form.formState.errors.organization.message)}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label>Email</Label>
        <Input {...form.register("email")} className="bg-white text-black" />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          type="password"
          {...form.register("password")}
          className="bg-white text-black"
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
