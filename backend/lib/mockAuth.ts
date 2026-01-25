"use client";

// Mock authentication - will be replaced with real Supabase auth later
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  isAdmin: boolean;
}

// Mock current user (stored in localStorage)
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem('uzbektype_user');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

// Mock Google login
export function loginWithGoogle(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUser: User = {
        id: 'mock-user-' + Math.random().toString(36).substr(2, 9),
        email: 'user@example.com',
        username: 'testuser',
        displayName: 'Test User',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
        isAdmin: false,
      };
      
      localStorage.setItem('uzbektype_user', JSON.stringify(mockUser));
      window.dispatchEvent(new Event('auth-change'));
      resolve(mockUser);
    }, 1000);
  });
}

// Mock admin login
export function loginAsAdmin(username: string, password: string): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Hardcoded admin credentials (TEMPORARY - for demo only)
      if (username === 'admin' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-user',
          email: 'admin@uzbektype.com',
          username: 'admin',
          displayName: 'Admin User',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
          isAdmin: true,
        };
        
        localStorage.setItem('uzbektype_user', JSON.stringify(adminUser));
        window.dispatchEvent(new Event('auth-change'));
        resolve(adminUser);
      } else {
        resolve(null);
      }
    }, 1000);
  });
}

// Logout
export function logout(): void {
  localStorage.removeItem('uzbektype_user');
  window.dispatchEvent(new Event('auth-change'));
}
