import { connectDb, hasMongoUri } from "@/lib/db";
import {
  defaultContent,
  defaultSettings,
  type SiteContent,
  type SiteSettings,
} from "@/lib/site-defaults";
import { SiteContentModel } from "@/models/SiteContent";
import { SiteSettingsModel } from "@/models/SiteSettings";

type StoredContent = Partial<SiteContent> & {
  _id?: unknown;
  __v?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
};

type StoredSettings = Partial<SiteSettings> & {
  _id?: unknown;
  __v?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
};

function stripMongoFields<T extends Record<string, unknown>>(value: T | null) {
  if (!value) {
    return null;
  }

  const { _id, __v, createdAt, updatedAt, ...plain } = value;
  void _id;
  void __v;
  void createdAt;
  void updatedAt;

  return plain;
}

function plainLink(link: { label?: unknown; href?: unknown }) {
  return {
    label: String(link.label || ""),
    href: String(link.href || ""),
  };
}

function plainValue(value: { title?: unknown; text?: unknown }) {
  return {
    title: String(value.title || ""),
    text: String(value.text || ""),
  };
}

function mergeNavLinks(links?: SiteSettings["navLinks"]) {
  const merged = links?.length
    ? links.map(plainLink).filter((link) => link.label && link.href)
    : [...defaultSettings.navLinks];

  for (const defaultLink of defaultSettings.navLinks) {
    if (!merged.some((link) => link.href === defaultLink.href)) {
      merged.push(defaultLink);
    }
  }

  return merged;
}

function mergeHomeContent(home?: Partial<SiteContent["home"]>) {
  const merged = { ...defaultContent.home, ...(home || {}) };

  if (merged.whyTitle === "Yerel ekipten net bilgi, guvenli tur planlamasi.") {
    merged.whyTitle = defaultContent.home.whyTitle;
  }

  if (
    merged.whyDescription ===
    "Fethiye ve Oludeniz cevresindeki turlar icin uygun saat, rota, transfer ve fiyat bilgilerini hizlica ogrenin. Seren Travel ekibi size en uygun deneyimi WhatsApp uzerinden net sekilde iletir."
  ) {
    merged.whyDescription = defaultContent.home.whyDescription;
  }

  return merged;
}

function mergeContent(content?: StoredContent | null): SiteContent {
  const plain = stripMongoFields(
    content as Record<string, unknown> | null,
  ) as Partial<SiteContent> | null;

  const contact = { ...defaultContent.contact, ...(plain?.contact || {}) };

  if (contact.mapQuery === "Fethiye Mugla") {
    contact.mapQuery = defaultContent.contact.mapQuery;
  }

  return {
    home: mergeHomeContent(plain?.home),
    tours: { ...defaultContent.tours, ...(plain?.tours || {}) },
    about: {
      ...defaultContent.about,
      ...(plain?.about || {}),
      values: plain?.about?.values?.length
        ? plain.about.values.map(plainValue)
        : defaultContent.about.values,
    },
    contact,
  };
}

function mergeSettings(settings?: StoredSettings | null): SiteSettings {
  const plain = stripMongoFields(
    settings as Record<string, unknown> | null,
  ) as Partial<SiteSettings> | null;

  const merged = {
    ...defaultSettings,
    ...(plain || {}),
    navLinks: mergeNavLinks(plain?.navLinks),
  };

  if (merged.location === "Fethiye / Mugla, Turkiye") {
    merged.location = defaultSettings.location;
  }

  return merged;
}

export async function getSiteContent() {
  if (!hasMongoUri()) {
    return defaultContent;
  }

  try {
    await connectDb();
    const doc = await SiteContentModel.findOne().lean();
    return mergeContent(doc as StoredContent | null);
  } catch {
    return defaultContent;
  }
}

export async function getSiteSettings() {
  if (!hasMongoUri()) {
    return defaultSettings;
  }

  try {
    await connectDb();
    const doc = await SiteSettingsModel.findOne().lean();
    return mergeSettings(doc as StoredSettings | null);
  } catch {
    return defaultSettings;
  }
}

export async function seedSiteContent() {
  await connectDb();
  await SiteContentModel.updateOne(
    {},
    { $setOnInsert: defaultContent },
    { upsert: true },
  );
  await SiteSettingsModel.updateOne(
    {},
    { $setOnInsert: defaultSettings },
    { upsert: true },
  );
}

export async function saveSiteContent(content: SiteContent) {
  await connectDb();
  return SiteContentModel.findOneAndUpdate(
    {},
    { $set: mergeContent(content) },
    { upsert: true, new: true },
  );
}

export async function saveSiteSettings(settings: SiteSettings) {
  await connectDb();
  return SiteSettingsModel.findOneAndUpdate(
    {},
    { $set: mergeSettings(settings) },
    { upsert: true, new: true },
  );
}
