import { isAdmin } from "@/lib/adminAuth";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin · UzbekType",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const ok = await isAdmin();
  return ok ? <AdminDashboard /> : <AdminLogin />;
}
