import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminAuth";
import AdminUserDetail from "./AdminUserDetail";

export const metadata = {
  title: "Foydalanuvchi · Admin · UzbekType",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

export default async function AdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) redirect("/admode");
  const { id } = await params;
  return <AdminUserDetail userId={id} />;
}
