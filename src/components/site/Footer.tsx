import Link from "next/link";
import { Instagram, MapPin, MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/905431999411?text=Merhaba%2C%20Seren%20Travel%20turlari%20hakkinda%20bilgi%20almak%20istiyorum.";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8 md:py-20">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-gold bg-white text-base font-semibold text-navy ring-2 ring-brand-red/85">
              ST
            </span>
            <div>
              <div className="text-sm font-semibold tracking-[0.24em] text-white">
                SEREN
              </div>
              <div className="mt-1 text-xs tracking-[0.34em] text-gold">
                TRAVEL
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md leading-relaxed text-white/60">
            Fethiye merkezli tur ve aktivite organizasyonu. Oludeniz, Babadag,
            Saklikent, Dalyan, Pamukkale ve Rodos rotalarinda profesyonel
            hizmet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-3 rounded-full bg-gold px-5 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/serentravelagency/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-3 rounded-full border border-white/15 px-5 text-sm text-white transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
              @serentravelagency
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">
            Menu
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Anasayfa
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" className="hover:text-white">
                Hakkimizda
              </Link>
            </li>
            <li>
              <Link href="/turlar" className="hover:text-white">
                Turlar
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-white">
                Iletisim
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">
            Iletisim
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 text-gold" />
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp ile bilgi al
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              <span>Fethiye / Mugla, Turkiye</span>
            </li>
            <li className="flex items-start gap-3">
              <Instagram className="mt-0.5 h-4 w-4 text-gold" />
              <a
                href="https://www.instagram.com/serentravelagency/"
                target="_blank"
                rel="noreferrer"
              >
                @serentravelagency
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/40 md:flex-row md:px-8">
          <span>
            © {new Date().getFullYear()} Seren Travel. Tum haklari saklidir.
          </span>
          <span>Fethiye · Mugla · Turkiye</span>
        </div>
      </div>
    </footer>
  );
}
