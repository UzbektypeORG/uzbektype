type UserLike = {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
};

export function displayName(u: UserLike | null | undefined): string {
  if (!u) return "—";
  const parts = [u.firstName, u.lastName].filter(Boolean);
  if (parts.length > 0) return parts.join(" ");
  return u.name ?? "—";
}

// Default avatar = pixel-art seeded by user identity (each user gets a unique
// default until they pick one in /profile). Never falls back to Google's photo.
export function avatarSrc(u: UserLike | null | undefined): string {
  if (u?.avatarUrl) return u.avatarUrl;
  const seed = u?.email || u?.id || "guest";
  return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;
}
