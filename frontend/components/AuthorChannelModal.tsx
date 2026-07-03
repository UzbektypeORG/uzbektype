"use client";

interface AuthorChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "uz" | "en" | "ru";
}

const CHANNEL_URL = "https://t.me/shavkatovio";

// Digital-skills framing (broad appeal) rather than a narrow "SEO service"
// pitch — a typing-practice audience bridges naturally to AI / digital skills.
const content = {
  uz: {
    title: "Raqamli ko'nikmangizni keyingi bosqichga",
    subtitle:
      "AI yangiliklari, avtomatlashtirish va raqamli ko'nikmalar bo'yicha foydali kontent — @shavkatovio kanalida.",
    cta: "Kanalga obuna bo'lish",
    later: "Keyinroq",
  },
  en: {
    title: "Take your digital skills further",
    subtitle:
      "Practical content on AI news, automation and digital skills — on the @shavkatovio channel.",
    cta: "Subscribe to channel",
    later: "Later",
  },
  ru: {
    title: "Прокачайте свои цифровые навыки",
    subtitle:
      "Полезный контент об AI, автоматизации и цифровых навыках — на канале @shavkatovio.",
    cta: "Подписаться на канал",
    later: "Позже",
  },
};

export default function AuthorChannelModal({ isOpen, onClose, lang }: AuthorChannelModalProps) {
  if (!isOpen) return null;
  const t = content[lang];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-background border border-border rounded-lg p-6 w-full max-w-md shadow-xl animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 w-16 h-16 rounded-full bg-[#229ED9]/10 flex items-center justify-center">
            {/* Telegram glyph with a small spark to hint AI/skills content */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#229ED9">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
          </div>

          <h2 className="text-lg font-semibold mb-2">{t.title}</h2>
          <p className="text-sm text-muted-foreground mb-6">{t.subtitle}</p>

          <div className="flex gap-2 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            >
              {t.later}
            </button>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // They're opening the channel — stop re-prompting on future tests.
                try {
                  localStorage.setItem("uzbektype_author_joined", "true");
                } catch {
                  // localStorage unavailable — ignore.
                }
                setTimeout(onClose, 200);
              }}
              className="flex-1 px-4 py-2.5 text-sm rounded-lg bg-[#229ED9] text-white hover:opacity-90 transition-all font-medium text-center"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
