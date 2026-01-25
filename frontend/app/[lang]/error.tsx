"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold">Xatolik yuz berdi</h1>
        <p className="text-muted-foreground">
          Nimadir noto'g'ri ketdi. Iltimos, qaytadan urinib ko'ring.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all"
        >
          Qaytadan urinish
        </button>
      </div>
    </div>
  );
}
