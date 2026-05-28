import Link from "next/link";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import type { SiteSettings } from "@/lib/site-defaults";
import { defaultSettings, whatsappUrl } from "@/lib/site-defaults";
import { siteImage } from "@/lib/utils";

export function Footer({
  settings = defaultSettings,
}: {
  settings?: SiteSettings;
}) {
  const whatsAppHref = whatsappUrl(settings);

  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8 md:py-20">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <img
              src={siteImage("/images/brand/header-logo-512.png")}
              alt={`${settings.brandTop} ${settings.brandBottom}`}
              width={512}
              height={512}
              className="h-20 w-20 rounded-full bg-white object-cover shadow-sm ring-2 ring-gold/70"
            />
          </div>
          <p className="mt-6 max-w-md leading-relaxed text-white/60">
            {settings.footerDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-3 rounded-full bg-gold px-5 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-3 rounded-full border border-white/15 px-5 text-sm text-white transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
              {settings.instagramLabel}
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">
            Menu
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {settings.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">
            Iletisim
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 text-gold" />
              <a href={whatsAppHref} target="_blank" rel="noreferrer">
                WhatsApp ile bilgi al
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              <span>{settings.location}</span>
            </li>
            <li className="flex items-start gap-3">
              <Instagram className="mt-0.5 h-4 w-4 text-gold" />
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer">
                {settings.instagramLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl grid grid-cols-1 items-center gap-3 px-5 py-6 text-xs text-white/40 md:grid-cols-3 md:px-8">
          <div className="md:text-left">
            <span>
              © {new Date().getFullYear()} {settings.brandTop}{" "}
              {settings.brandBottom}. Tum haklari saklidir.
            </span>
          </div>

          <div className="text-center">
            <a
              href="https://www.onurturgut.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:underline"
            >
              aisurix.web
            </a>
          </div>

          <div className="md:text-right">
            <span>{settings.footerBottomText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
