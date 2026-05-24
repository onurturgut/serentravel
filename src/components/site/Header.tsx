"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Instagram, Menu, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteSettings } from "@/lib/site-defaults";
import { defaultSettings, whatsappUrl } from "@/lib/site-defaults";

function Brand({ settings }: { settings: SiteSettings }) {
  return (
    <span className="flex items-center">
      <img
        src="/images/brand/header-logo.png"
        alt={`${settings.brandTop} ${settings.brandBottom}`}
        width={256}
        height={256}
        className="h-12 w-12 rounded-full bg-white object-cover shadow-md ring-2 ring-gold/80 md:h-14 md:w-14"
      />
    </span>
  );
}

export function Header({
  settings = defaultSettings,
}: {
  settings?: SiteSettings;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const whatsAppHref = whatsappUrl(settings);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-navy-deep/86 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-[4.25rem] max-w-7xl grid-cols-[1fr_auto] items-center px-4 sm:px-5 md:h-20 md:grid-cols-[1fr_auto_1fr] md:px-8">
          <Link href="/" aria-label={`${settings.brandTop} anasayfa`}>
            <Brand settings={settings} />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {settings.navLinks.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? "text-gold underline decoration-brand-red decoration-2 underline-offset-8"
                      : "text-white/82 hover:text-white"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp ile iletisime gec"
              title="WhatsApp"
              className="tap-target hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-sea hover:text-sea md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="tap-target hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:text-gold md:inline-flex"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="tap-target inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
              aria-label="Menuyu ac"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-navy-deep pt-[env(safe-area-inset-top)] md:hidden"
          >
            <div className="flex h-[4.25rem] items-center justify-between px-5">
              <Brand settings={settings} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
                aria-label="Menuyu kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 px-8 pt-10">
              {settings.navLinks.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={n.href}
                    className="block font-display text-5xl text-white transition-colors hover:text-gold"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="absolute inset-x-8 bottom-[calc(2.5rem+env(safe-area-inset-bottom))] flex items-center justify-between border-t border-white/10 pt-6">
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-3 rounded-full bg-gold px-5 text-sm font-semibold text-navy-deep"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
