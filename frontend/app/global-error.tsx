"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-md">
            <h1 className="text-4xl font-bold">Xatolik yuz berdi</h1>
            <p className="text-muted-foreground">
              Nimadir noto'g'ri ketdi. Iltimos, sahifani yangilang.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition-all"
            >
              Qaytadan urinish
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
