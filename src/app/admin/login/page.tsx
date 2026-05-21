import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "../ui/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Giris",
};

export default async function Page() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return <AdminLoginForm />;
}
