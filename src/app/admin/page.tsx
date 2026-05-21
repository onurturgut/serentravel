import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCategories, getTours } from "@/lib/content";
import { hasMongoUri } from "@/lib/db";
import { getGalleryImages } from "@/lib/gallery";
import { getSiteContent, getSiteSettings } from "@/lib/site-content";
import { AdminEditor } from "./ui/AdminEditor";

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default async function Page() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [tours, categories, siteContent, siteSettings, galleryImages] =
    await Promise.all([
      getTours({ includeInactive: true }),
      getCategories(),
      getSiteContent(),
      getSiteSettings(),
      getGalleryImages(),
    ]);

  return (
    <AdminEditor
      initialTours={tours}
      initialCategories={categories}
      initialSiteContent={siteContent}
      initialSiteSettings={siteSettings}
      initialGalleryImages={galleryImages}
      mongoConfigured={hasMongoUri()}
    />
  );
}
