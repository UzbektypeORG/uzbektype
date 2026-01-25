"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/mockAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.isAdmin) {
      router.push('/__admin');
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/__admin');
  };

  const navItems = [
    { href: '/__admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/__admin/dashboard/users', label: 'Users', icon: '👥' },
    { href: '/__admin/dashboard/results', label: 'Test Results', icon: '📝' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-muted/30 p-6">
        <div className="space-y-8">
          {/* Logo */}
          <div>
            <h2 className="text-xl font-bold">UzbekType Admin</h2>
            <p className="text-sm text-muted-foreground mt-1">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded transition-colors ` + (
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'hover:bg-accent'
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10 rounded transition-colors"
            >
              🚪 Logout
            </button>
            <Link
              href="/"
              className="block w-full px-4 py-2 mt-2 text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
