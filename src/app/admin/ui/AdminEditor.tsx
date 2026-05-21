"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Copy,
  Eye,
  ImageIcon,
  LayoutGrid,
  ListPlus,
  LogOut,
  Plus,
  Save,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { TourCard } from "@/components/site/TourCard";
import type { Category } from "@/lib/content";
import type { SiteContent, SiteSettings } from "@/lib/site-defaults";
import { slugify } from "@/lib/slug";
import type { Tour } from "@/lib/tours";

type EditableTour = Tour & {
  id?: string;
};

type EditableGalleryImage = {
  id?: string;
  src: string;
  alt: string;
  order: number;
  isActive: boolean;
};

type EditorStep = "basics" | "media" | "details" | "lists" | "publish";
type TourTemplate = "tekne" | "macera" | "kultur" | "dalis" | "ozel";

const fallbackImage = "/images/tours/fethiye-12-adalar-tekne-turu.jpg";

const templateLabels: Record<TourTemplate, string> = {
  tekne: "Tekne Turu",
  macera: "Macera / Safari",
  kultur: "Kultur Turu",
  dalis: "Dalis Turu",
  ozel: "Ozel Tur",
};

const templateTours: Record<TourTemplate, EditableTour> = {
  tekne: {
    title: "Yeni Tekne Turu",
    slug: "yeni-tekne-turu",
    category: "Tekne Turu",
    short: "Koylar, yuzme molalari ve keyifli bir gunluk deniz deneyimi.",
    description:
      "Misafirler icin konforlu, guvenli ve keyifli bir tekne turu programi hazirlanir. Rota, hava kosullari ve sezon yogunluguna gore netlestirilir.",
    image: fallbackImage,
    duration: "Tam gun",
    type: "Grup tekne turu",
    booking: "WhatsApp ile bilgi",
    included: ["Transfer", "Ogle yemegi", "Yuzme molalari"],
    stops: ["Fethiye", "Koy molalari", "Donus"],
    notes: [],
    gallery: [fallbackImage],
    order: 0,
    isFeatured: false,
    isActive: false,
  },
  macera: {
    title: "Yeni Macera Turu",
    slug: "yeni-macera-turu",
    category: "Macera",
    short: "Dogayla ic ice, hareketli ve eglenceli bir aktivite deneyimi.",
    description:
      "Profesyonel ekipler esliginde guvenli, planli ve bol enerjili bir macera turu sunulur. Katilim oncesi gerekli bilgilendirme yapilir.",
    image: "/images/tours/fethiye-jeep-safari.png",
    duration: "Tam gun",
    type: "Grup aktivitesi",
    booking: "Otel transferli",
    included: ["Transfer", "Rehberlik", "Guvenlik bilgilendirmesi"],
    stops: ["Baslangic noktasi", "Aktivite parkuru", "Mola alani"],
    notes: ["Ek aktiviteler ucretli olabilir."],
    gallery: ["/images/tours/fethiye-jeep-safari.png"],
    order: 0,
    isFeatured: false,
    isActive: false,
  },
  kultur: {
    title: "Yeni Kultur Turu",
    slug: "yeni-kultur-turu",
    category: "Kultur",
    short: "Tarih, doga ve bolgenin ozel duraklarini bir araya getirir.",
    description:
      "Bolgenin tarihi ve dogal noktalarini kapsayan bu turda misafirlere planli bir gezi deneyimi sunulur. Program detaylari sezon ve uygunluga gore netlesir.",
    image: "/images/tours/pamukkale-hierapolis.webp",
    duration: "Uzun tam gun",
    type: "Kultur turu",
    booking: "Uygunluk icin WhatsApp",
    included: ["Transfer", "Rehberlik", "Program planlamasi"],
    stops: ["Hareket", "Ziyaret noktasi", "Serbest zaman"],
    notes: [],
    gallery: ["/images/tours/pamukkale-hierapolis.webp"],
    order: 0,
    isFeatured: false,
    isActive: false,
  },
  dalis: {
    title: "Yeni Dalis Turu",
    slug: "yeni-dalis-turu",
    category: "Dalis",
    short: "Profesyonel ekip esliginde guvenli ve keyifli dalis deneyimi.",
    description:
      "Ilk kez dalis yapacak misafirler icin kisa egitim verilir. Ekipmanlar hazirlanir ve dalis profesyonel ekip kontrolunde gerceklesir.",
    image: "/images/tours/fethiye-tuplu-dalis.jpg",
    duration: "Program saatine gore",
    type: "Tuplu dalis",
    booking: "Kontenjan icin WhatsApp",
    included: ["Kisa egitim", "Dalis ekipmanlari", "Profesyonel egitmen"],
    stops: ["Tekne cikisi", "Dalis noktasi", "Donus"],
    notes: ["Fotograf ve video cekimi ekstra ucretli olabilir."],
    gallery: ["/images/tours/fethiye-tuplu-dalis.jpg"],
    order: 0,
    isFeatured: false,
    isActive: false,
  },
  ozel: {
    title: "Yeni Ozel Tur",
    slug: "yeni-ozel-tur",
    category: "Ozel Tur",
    short: "Misafire ozel rota, zamanlama ve esnek program secenekleri.",
    description:
      "Ozel tur planlamasi misafirin beklentisine gore hazirlanir. Rota, sure, katilim sayisi ve hizmet detaylari talebe gore netlestirilir.",
    image: "/images/tours/fethiye-12-adalar-tekne-turu-2.jpg",
    duration: "Rota secimine gore",
    type: "Ozel organizasyon",
    booking: "WhatsApp ile planlama",
    included: ["Rota danismanligi", "Ozel planlama", "Destek"],
    stops: ["Ozel rota", "Mola noktasi", "Donus"],
    notes: [],
    gallery: ["/images/tours/fethiye-12-adalar-tekne-turu-2.jpg"],
    order: 0,
    isFeatured: false,
    isActive: false,
  },
};

const steps: { id: EditorStep; title: string; helper: string }[] = [
  {
    id: "basics",
    title: "Temel",
    helper: "Tur adi, kategori ve kisa tanitim.",
  },
  {
    id: "media",
    title: "Gorsel",
    helper: "Kart fotografi ve galeri adresleri.",
  },
  {
    id: "details",
    title: "Detay",
    helper: "Sure, katilim tipi ve aciklama.",
  },
  {
    id: "lists",
    title: "Listeler",
    helper: "Dahil olanlar, rota ve notlar.",
  },
  {
    id: "publish",
    title: "Yayin",
    helper: "Taslak, one cikan ve kaydetme.",
  },
];

function createTourFromTemplate(template: TourTemplate, order: number) {
  const source = templateTours[template];
  const stamp = Date.now();
  return {
    ...source,
    title: source.title,
    slug: `${source.slug}-${stamp}`,
    order,
    included: [...source.included],
    stops: [...(source.stops || [])],
    notes: [...(source.notes || [])],
    gallery: [...source.gallery],
  };
}

export function AdminEditor({
  initialTours,
  initialCategories,
  initialSiteContent,
  initialSiteSettings,
  initialGalleryImages,
  mongoConfigured,
}: {
  initialTours: Tour[];
  initialCategories: Category[];
  initialSiteContent: SiteContent;
  initialSiteSettings: SiteSettings;
  initialGalleryImages: EditableGalleryImage[];
  mongoConfigured: boolean;
}) {
  const router = useRouter();
  const [tours, setTours] = useState<EditableTour[]>(initialTours);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedSlug, setSelectedSlug] = useState(
    initialTours[0]?.slug || templateTours.tekne.slug,
  );
  const [draft, setDraft] = useState<EditableTour>(
    initialTours[0] || createTourFromTemplate("tekne", 0),
  );
  const [activeStep, setActiveStep] = useState<EditorStep>("basics");
  const [search, setSearch] = useState("");
  const [categoryDraft, setCategoryDraft] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingTarget, setUploadingTarget] = useState<
    "main" | "gallery" | null
  >(null);
  const [panel, setPanel] = useState<
    "tours" | "content" | "gallery" | "transfer"
  >("tours");
  const [siteContent, setSiteContent] =
    useState<SiteContent>(initialSiteContent);
  const [siteSettings, setSiteSettings] =
    useState<SiteSettings>(initialSiteSettings);
  const [isSiteSaving, setIsSiteSaving] = useState(false);
  const [galleryImages, setGalleryImages] =
    useState<EditableGalleryImage[]>(initialGalleryImages);
  const [galleryStatus, setGalleryStatus] = useState("");
  const [galleryError, setGalleryError] = useState("");
  const [galleryUpload, setGalleryUpload] = useState(false);

  const categoryNames = useMemo(
    () => categories.map((category) => category.name),
    [categories],
  );

  const filteredTours = useMemo(() => {
    const keyword = search.toLocaleLowerCase("tr").trim();
    if (!keyword) {
      return tours;
    }

    return tours.filter(
      (tour) =>
        tour.title.toLocaleLowerCase("tr").includes(keyword) ||
        tour.category.toLocaleLowerCase("tr").includes(keyword),
    );
  }, [search, tours]);

  const completion = useMemo(() => {
    const checks = [
      Boolean(draft.title.trim()),
      Boolean(draft.category.trim()),
      Boolean(draft.short.trim()),
      Boolean(draft.description.trim()),
      Boolean(draft.image.trim()),
      Boolean(draft.duration.trim()),
      Boolean(draft.type.trim()),
      Boolean(draft.booking.trim()),
      draft.included.length > 0,
    ];
    const done = checks.filter(Boolean).length;

    return Math.round((done / checks.length) * 100);
  }, [draft]);

  function selectTour(slug: string) {
    const selected = tours.find((tour) => tour.slug === slug);
    if (!selected) {
      return;
    }

    setSelectedSlug(slug);
    setDraft(selected);
    setActiveStep("basics");
    setStatus("");
    setError("");
  }

  function updateDraft<K extends keyof EditableTour>(
    key: K,
    value: EditableTour[K],
  ) {
    setDraft((current) => {
      const next = { ...current, [key]: value };

      if (key === "title" && (!current.slug || current.slug === selectedSlug)) {
        next.slug = slugify(String(value));
      }

      return next;
    });
  }

  function createLocalTour(template: TourTemplate = "tekne") {
    const next = createTourFromTemplate(template, tours.length);

    setTours((current) => [next, ...current]);
    setSelectedSlug(next.slug);
    setDraft(next);
    setActiveStep("basics");
    setStatus("Yeni tur taslagi hazir. Bilgileri doldurup kaydedebilirsin.");
    setError("");
  }

  function duplicateTour() {
    const next = {
      ...draft,
      id: undefined,
      title: `${draft.title} Kopya`,
      slug: `${slugify(draft.title)}-kopya-${Date.now()}`,
      isActive: false,
      isFeatured: false,
      included: [...draft.included],
      stops: [...(draft.stops || [])],
      notes: [...(draft.notes || [])],
      gallery: [...draft.gallery],
    };

    setTours((current) => [next, ...current]);
    setSelectedSlug(next.slug);
    setDraft(next);
    setActiveStep("basics");
    setStatus("Tur kopyalandi. Yeni tur taslak olarak acildi.");
    setError("");
  }

  function updateList(
    field: "included" | "stops" | "notes" | "gallery",
    index: number,
    value: string,
  ) {
    const current = [...((draft[field] as string[] | undefined) || [])];
    current[index] = value;
    updateDraft(
      field,
      current
        .map((item) => item.trim())
        .filter(Boolean) as EditableTour[typeof field],
    );
  }

  function addListItem(field: "included" | "stops" | "notes" | "gallery") {
    const current = [...((draft[field] as string[] | undefined) || [])];
    updateDraft(field, [...current, ""] as EditableTour[typeof field]);
  }

  function removeListItem(
    field: "included" | "stops" | "notes" | "gallery",
    index: number,
  ) {
    const current = [...((draft[field] as string[] | undefined) || [])];
    current.splice(index, 1);
    updateDraft(field, current as EditableTour[typeof field]);
  }

  function pasteList(
    field: "included" | "stops" | "notes" | "gallery",
    value: string,
  ) {
    const items = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    updateDraft(field, items as EditableTour[typeof field]);
  }

  async function uploadImage(file: File, target: "main" | "gallery") {
    setUploadingTarget(target);
    setError("");
    setStatus("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "tours");

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
      url?: string;
    };

    setUploadingTarget(null);

    if (!response.ok || !data.url) {
      setError(data.error || "Gorsel yuklenemedi.");
      return;
    }

    if (target === "main") {
      const gallery = draft.gallery.includes(data.url)
        ? draft.gallery
        : [data.url, ...draft.gallery];

      updateDraft("image", data.url);
      updateDraft("gallery", gallery);
      setStatus("Ana gorsel R2'ye yuklendi.");
      return;
    }

    updateDraft("gallery", [...draft.gallery, data.url]);
    setStatus("Galeri gorseli R2'ye yuklendi.");
  }

  async function saveTour(forceActive?: boolean) {
    const payload = {
      ...draft,
      isActive: typeof forceActive === "boolean" ? forceActive : draft.isActive,
    };

    setIsSaving(true);
    setError("");
    setStatus("");

    const endpoint = payload.id
      ? `/api/admin/tours/${payload.id}`
      : "/api/admin/tours";
    const method = payload.id ? "PUT" : "POST";
    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
      tour?: EditableTour & { _id?: string };
    };

    setIsSaving(false);

    if (!response.ok) {
      setError(data.error || "Kayit sirasinda hata olustu.");
      return;
    }

    const saved = {
      ...payload,
      id: data.tour?._id || data.tour?.id || payload.id,
    };

    setTours((current) => {
      const exists = current.some((tour) => tour.slug === selectedSlug);
      return exists
        ? current.map((tour) => (tour.slug === selectedSlug ? saved : tour))
        : [saved, ...current];
    });
    setSelectedSlug(saved.slug);
    setDraft(saved);
    setStatus(
      saved.isActive ? "Tur yayinda ve kaydedildi." : "Taslak kaydedildi.",
    );
    router.refresh();
  }

  async function deleteTour() {
    const confirmed = window.confirm(
      "Bu tur silinecek. Emin misiniz? Bu islem geri alinamaz.",
    );

    if (!confirmed) {
      return;
    }

    if (!draft.id) {
      const nextTours = tours.filter((tour) => tour.slug !== draft.slug);
      const next = nextTours[0] || createTourFromTemplate("tekne", 0);
      setTours(nextTours);
      setDraft(next);
      setSelectedSlug(next.slug);
      setStatus("Kaydedilmemis taslak silindi.");
      return;
    }

    const response = await fetch(`/api/admin/tours/${draft.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      setError(data.error || "Tur silinemedi.");
      return;
    }

    const nextTours = tours.filter((tour) => tour.id !== draft.id);
    const next = nextTours[0] || createTourFromTemplate("tekne", 0);
    setTours(nextTours);
    setDraft(next);
    setSelectedSlug(next.slug);
    setStatus("Tur silindi.");
    router.refresh();
  }

  async function addCategory(nameFromQuickAction?: string) {
    const name = (nameFromQuickAction || categoryDraft).trim();
    if (!name) {
      setError("Kategori adi yazin, sonra ekle butonuna basin.");
      return;
    }

    const existing = categories.find(
      (category) =>
        category.name.toLocaleLowerCase("tr") === name.toLocaleLowerCase("tr"),
    );

    if (existing) {
      updateDraft("category", existing.name);
      setCategoryDraft("");
      setStatus("Kategori zaten vardi, bu tur icin secildi.");
      return;
    }

    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug: slugify(name) }),
    });
    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
      category?: Category & { _id?: string };
    };

    if (!response.ok) {
      setError(data.error || "Kategori eklenemedi.");
      return;
    }

    const category = {
      id: data.category?._id || data.category?.id,
      name,
      slug: slugify(name),
      order: categories.length,
      isActive: true,
    };

    setCategories((current) => [...current, category]);
    setCategoryDraft("");
    updateDraft("category", name);
    setStatus("Kategori eklendi ve bu tur icin secildi.");
  }

  async function seedMongo() {
    setError("");
    setStatus("");

    const response = await fetch("/api/admin/seed", { method: "POST" });
    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
      importedTours?: number;
      importedCategories?: number;
    };

    if (!response.ok) {
      setError(data.error || "Aktarim yapilamadi.");
      return;
    }

    setStatus(
      `${data.importedTours || 0} tur ve ${
        data.importedCategories || 0
      } kategori MongoDB'ye aktarildi.`,
    );
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function saveSite() {
    setIsSiteSaving(true);
    setError("");
    setStatus("");

    const response = await fetch("/api/admin/site-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: siteContent,
        settings: siteSettings,
      }),
    });
    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
    };

    setIsSiteSaving(false);

    if (!response.ok) {
      setError(data.error || "Site icerigi kaydedilemedi.");
      return;
    }

    setStatus("Site yazilari ve butonlari kaydedildi.");
    router.refresh();
  }

  async function uploadGalleryImage(file: File) {
    setGalleryUpload(true);
    setGalleryError("");
    setGalleryStatus("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "gallery");

    const uploadResponse = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const uploadData = (await uploadResponse.json().catch(() => ({}))) as {
      error?: string;
      url?: string;
    };

    if (!uploadResponse.ok || !uploadData.url) {
      setGalleryUpload(false);
      setGalleryError(uploadData.error || "Gorsel yuklenemedi.");
      return;
    }

    const saveResponse = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        src: uploadData.url,
        alt: "Seren Travel galeri",
        order: galleryImages.length,
        isActive: true,
      }),
    });
    const saveData = (await saveResponse.json().catch(() => ({}))) as {
      error?: string;
      image?: EditableGalleryImage & { _id?: string };
    };

    setGalleryUpload(false);

    if (!saveResponse.ok || !saveData.image) {
      setGalleryError(saveData.error || "Galeriye kaydedilemedi.");
      return;
    }

    const uploadedUrl = uploadData.url;

    setGalleryImages((current) => [
      ...current,
      {
        id: saveData.image?._id || saveData.image?.id,
        src: uploadedUrl,
        alt: "Seren Travel galeri",
        order: current.length,
        isActive: true,
      },
    ]);
    setGalleryStatus("Gorsel galeriye eklendi.");
    router.refresh();
  }

  async function seedGallery() {
    setGalleryError("");
    setGalleryStatus("");

    const response = await fetch("/api/admin/gallery/seed", { method: "POST" });
    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
      imported?: number;
    };

    if (!response.ok) {
      setGalleryError(data.error || "Galeri aktarilamadi.");
      return;
    }

    const refresh = await fetch("/api/admin/gallery");
    const refreshData = (await refresh.json().catch(() => ({}))) as {
      images?: EditableGalleryImage[];
    };

    setGalleryImages(refreshData.images || galleryImages);
    setGalleryStatus(`${data.imported || 0} gorsel galeriye aktarildi.`);
    router.refresh();
  }

  return (
    <main className="safe-x min-h-screen bg-[#f5f1e8] text-foreground">
      <header className="border-b border-black/10 bg-navy-deep text-white">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-gold">
              <LayoutGrid className="h-4 w-4" />
              Seren Travel
            </div>
            <h1 className="mt-2 font-display text-3xl">Kolay Tur Yonetimi</h1>
          </div>
          <button
            onClick={logout}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm transition-colors hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Cikis
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] flex-wrap gap-3 px-4 pt-5 sm:px-5 md:px-8">
        <button
          onClick={() => setPanel("tours")}
          className={`h-11 rounded-full px-5 text-sm font-semibold ${
            panel === "tours"
              ? "bg-navy text-white"
              : "border border-black/10 bg-white text-foreground"
          }`}
        >
          Tur ve Kategori
        </button>
        <button
          onClick={() => setPanel("content")}
          className={`h-11 rounded-full px-5 text-sm font-semibold ${
            panel === "content"
              ? "bg-navy text-white"
              : "border border-black/10 bg-white text-foreground"
          }`}
        >
          Site Yazilari ve Butonlar
        </button>
        <button
          onClick={() => setPanel("gallery")}
          className={`h-11 rounded-full px-5 text-sm font-semibold ${
            panel === "gallery"
              ? "bg-navy text-white"
              : "border border-black/10 bg-white text-foreground"
          }`}
        >
          Galeri
        </button>
        <button
          onClick={() => setPanel("transfer")}
          className={`h-11 rounded-full px-5 text-sm font-semibold ${
            panel === "transfer"
              ? "bg-navy text-white"
              : "border border-black/10 bg-white text-foreground"
          }`}
        >
          Transfer
        </button>
      </div>

      {panel === "content" ? (
        <SiteContentManager
          content={siteContent}
          settings={siteSettings}
          mongoConfigured={mongoConfigured}
          status={status}
          error={error}
          isSaving={isSiteSaving}
          onContentChange={setSiteContent}
          onSettingsChange={setSiteSettings}
          onSave={saveSite}
        />
      ) : panel === "gallery" ? (
        <GalleryManager
          images={galleryImages}
          status={galleryStatus}
          error={galleryError}
          isUploading={galleryUpload}
          onUpload={uploadGalleryImage}
          onSeed={seedGallery}
        />
      ) : panel === "transfer" ? (
        <TransferManager
          tours={tours}
          onSelect={(slug) => {
            selectTour(slug);
            setPanel("tours");
          }}
          onCreate={() => {
            const next = createTourFromTemplate("ozel", tours.length);
            next.title = "Transfer";
            next.slug = "transfer";
            next.category = "Transfer";
            next.short = "Fethiye ve cevre bolgeler icin transfer hizmeti.";
            setTours((current) => [next, ...current]);
            setSelectedSlug(next.slug);
            setDraft(next);
            setPanel("tours");
            setActiveStep("basics");
          }}
        />
      ) : (
        <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-5 sm:px-5 md:px-8 xl:grid-cols-[minmax(0,1.12fr)_minmax(380px,0.88fr)]">
          <section className="min-w-0 space-y-5">
            <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-[0.24em] text-gold">
                    1. Grid
                  </span>
                  <h2 className="mt-1 text-2xl font-semibold">
                    Tur ve Kategori Olustur
                  </h2>
                  <p className="mt-1 text-sm text-foreground/55">
                    Sablon sec, bilgileri doldur, onizle ve tek tusla yayinla.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={duplicateTour}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-semibold text-foreground"
                  >
                    <Copy className="h-4 w-4" />
                    Kopyala
                  </button>
                  <button
                    onClick={() => createLocalTour("tekne")}
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-navy px-4 text-sm font-semibold text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Yeni Tur
                  </button>
                </div>
              </div>

              {!mongoConfigured && (
                <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
                  MongoDB henuz ayarlanmamis. Onizleme calisir, fakat kayit icin
                  `.env.local` icinde `MONGODB_URI` ve `ADMIN_PASSWORD` gerekir.
                </div>
              )}

              {mongoConfigured && tours.some((tour) => !tour.id) && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  <span>
                    Mevcut statik turlar gorunuyor. Bunlari MongoDB'ye aktarip
                    panelden yonetebilirsiniz.
                  </span>
                  <button
                    onClick={seedMongo}
                    className="h-10 rounded-full bg-emerald-700 px-4 text-sm font-semibold text-white"
                  >
                    MongoDB'ye Aktar
                  </button>
                </div>
              )}

              <div className="mt-6 grid min-w-0 gap-4 xl:grid-cols-[minmax(220px,0.8fr)_1fr]">
                <div className="space-y-3">
                  <label className="grid gap-2 text-sm font-medium">
                    Tur ara veya sec
                    <div className="flex h-11 items-center gap-2 rounded-lg border border-black/10 bg-white px-3">
                      <Search className="h-4 w-4 text-foreground/40" />
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Tur adi veya kategori"
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                      />
                    </div>
                  </label>
                  <div className="max-h-72 space-y-2 overflow-auto pr-1">
                    {filteredTours.map((tour) => (
                      <button
                        key={`${tour.slug}-${tour.id || "local"}`}
                        onClick={() => selectTour(tour.slug)}
                        className={`w-full rounded-lg border p-3 text-left transition-colors ${
                          selectedSlug === tour.slug
                            ? "border-gold bg-gold/10"
                            : "border-black/10 bg-white hover:bg-sand-light"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="line-clamp-1 text-sm font-semibold">
                            {tour.title}
                          </span>
                          <span
                            className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                              tour.isActive !== false
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {tour.isActive !== false ? "Yayinda" : "Taslak"}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-foreground/50">
                          {tour.category}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-black/10 bg-sand-light p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <Sparkles className="h-4 w-4 text-gold" />
                          Hizli baslangic sablonlari
                        </div>
                        <p className="mt-1 text-xs text-foreground/55">
                          Bilgisayarla arasi olmayan biri bile sablon secip
                          sadece tur adini ve detaylari degistirebilir.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
                      {(Object.keys(templateLabels) as TourTemplate[]).map(
                        (template) => (
                          <button
                            key={template}
                            onClick={() => createLocalTour(template)}
                            className="rounded-lg border border-black/10 bg-white px-3 py-3 text-left text-sm font-semibold transition-colors hover:border-gold hover:bg-gold/10"
                          >
                            {templateLabels[template]}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-black/10 bg-white p-4">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {steps.map((step) => (
                        <button
                          key={step.id}
                          onClick={() => setActiveStep(step.id)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                            activeStep === step.id
                              ? "bg-navy text-white"
                              : "bg-sand-light text-foreground/70 hover:bg-gold/20"
                          }`}
                        >
                          {step.title}
                        </button>
                      ))}
                    </div>

                    <div className="mb-5 rounded-lg bg-navy-deep p-4 text-white">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs uppercase tracking-[0.22em] text-gold">
                            {
                              steps.find((step) => step.id === activeStep)
                                ?.title
                            }
                          </div>
                          <p className="mt-1 text-sm text-white/65">
                            {
                              steps.find((step) => step.id === activeStep)
                                ?.helper
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-semibold">
                            %{completion}
                          </div>
                          <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                            Hazirlik
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gold"
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                    </div>

                    {activeStep === "basics" && (
                      <div className="grid gap-4">
                        <TextInput
                          label="Tur adi"
                          helper="Ornek: Fethiye 12 Adalar Tekne Turu"
                          value={draft.title}
                          onChange={(value) => updateDraft("title", value)}
                        />
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="grid gap-2 text-sm font-medium">
                            Kategori
                            <select
                              value={draft.category}
                              onChange={(event) =>
                                updateDraft("category", event.target.value)
                              }
                              className="h-12 rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-gold"
                            >
                              {categoryNames.map((name) => (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              ))}
                              {!categoryNames.includes(draft.category) && (
                                <option value={draft.category}>
                                  {draft.category}
                                </option>
                              )}
                            </select>
                          </label>
                          <TextInput
                            label="Sayfa linki"
                            helper="Otomatik olusur. Gerekirse duzeltilebilir."
                            value={draft.slug}
                            onChange={(value) =>
                              updateDraft("slug", slugify(value))
                            }
                          />
                        </div>
                        <div className="grid gap-3 rounded-lg border border-black/10 bg-sand-light p-4 sm:grid-cols-[1fr_auto] sm:items-end">
                          <TextInput
                            label="Yeni kategori ekle"
                            helper="Ornek: Aile Turlari, Ozel Turlar"
                            value={categoryDraft}
                            onChange={setCategoryDraft}
                            placeholder="Kategori adi yaz"
                          />
                          <button
                            onClick={() => addCategory()}
                            className="h-12 rounded-full bg-navy px-5 text-sm font-semibold text-white"
                          >
                            Kategoriyi Ekle
                          </button>
                        </div>
                        <TextArea
                          label="Kartta gorunecek kisa aciklama"
                          helper="1-2 cumle yeterli. Uzun yazarsan kartta kisaltilir."
                          value={draft.short}
                          onChange={(value) => updateDraft("short", value)}
                          rows={3}
                        />
                      </div>
                    )}

                    {activeStep === "media" && (
                      <div className="grid gap-4">
                        <div className="rounded-lg border border-gold/30 bg-gold/10 p-4 text-sm leading-relaxed text-foreground/70">
                          <div className="flex items-center gap-2 font-semibold text-foreground">
                            <ImageIcon className="h-4 w-4 text-gold" />
                            Gorsel olcusu
                          </div>
                          Tur karti dikey gorunur. En iyi sonuc icin 3:4
                          oraninda fotograf kullanin. Ornek olcu: 1200x1600 px.
                        </div>
                        <div className="grid gap-3 rounded-lg border border-black/10 bg-white p-4 sm:grid-cols-2">
                          <ImageUploadButton
                            label="Ana Gorsel Yukle"
                            helper="Kartta gorunecek fotografi yukler ve URL alanina otomatik yazar."
                            isUploading={uploadingTarget === "main"}
                            onUpload={(file) => uploadImage(file, "main")}
                          />
                          <ImageUploadButton
                            label="Galeriye Gorsel Yukle"
                            helper="Secilen fotografi galeri listesinin sonuna ekler."
                            isUploading={uploadingTarget === "gallery"}
                            onUpload={(file) => uploadImage(file, "gallery")}
                          />
                        </div>
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
                          Yukleme sonrasi URL otomatik dolar. Gorsel sitede
                          acilmazsa R2 bucket icin r2.dev public URL veya custom
                          domain baglanmalidir.
                        </div>
                        <TextInput
                          label="Ana kart gorseli URL"
                          helper="Yukleme butonu bu alani otomatik doldurur. Istersen elle URL de yazabilirsin."
                          value={draft.image}
                          onChange={(value) => updateDraft("image", value)}
                        />
                        <ListEditor
                          label="Galeri gorselleri"
                          helper="Her satira veya kutuya bir gorsel URL'si ekleyin."
                          values={draft.gallery}
                          placeholder="https://..."
                          onAdd={() => addListItem("gallery")}
                          onPaste={(value) => pasteList("gallery", value)}
                          onChange={(index, value) =>
                            updateList("gallery", index, value)
                          }
                          onRemove={(index) => removeListItem("gallery", index)}
                        />
                      </div>
                    )}

                    {activeStep === "details" && (
                      <div className="grid gap-4">
                        <TextArea
                          label="Detay sayfasi aciklamasi"
                          helper="Turun nasil gectigini, kimler icin uygun oldugunu ve genel deneyimi yazin."
                          value={draft.description}
                          onChange={(value) =>
                            updateDraft("description", value)
                          }
                          rows={6}
                        />
                        <div className="grid gap-4 sm:grid-cols-3">
                          <TextInput
                            label="Sure"
                            value={draft.duration}
                            onChange={(value) => updateDraft("duration", value)}
                            placeholder="Tam gun"
                          />
                          <TextInput
                            label="Katilim tipi"
                            value={draft.type}
                            onChange={(value) => updateDraft("type", value)}
                            placeholder="Grup turu"
                          />
                          <TextInput
                            label="Rezervasyon"
                            value={draft.booking}
                            onChange={(value) => updateDraft("booking", value)}
                            placeholder="WhatsApp ile bilgi"
                          />
                        </div>
                      </div>
                    )}

                    {activeStep === "lists" && (
                      <div className="grid gap-4">
                        <ListEditor
                          label="Fiyata dahil olanlar"
                          helper="Ornek: Transfer, ogle yemegi, rehberlik."
                          values={draft.included}
                          placeholder="Yeni madde"
                          onAdd={() => addListItem("included")}
                          onPaste={(value) => pasteList("included", value)}
                          onChange={(index, value) =>
                            updateList("included", index, value)
                          }
                          onRemove={(index) =>
                            removeListItem("included", index)
                          }
                        />
                        <ListEditor
                          label="Rota ve duraklar"
                          helper="Turun ugrak noktalarini sirasiyla yazin."
                          values={draft.stops || []}
                          placeholder="Yeni durak"
                          onAdd={() => addListItem("stops")}
                          onPaste={(value) => pasteList("stops", value)}
                          onChange={(index, value) =>
                            updateList("stops", index, value)
                          }
                          onRemove={(index) => removeListItem("stops", index)}
                        />
                        <ListEditor
                          label="Notlar"
                          helper="Ekstra ucret, kiyafet, saat bilgisi gibi uyarilar."
                          values={draft.notes || []}
                          placeholder="Yeni not"
                          onAdd={() => addListItem("notes")}
                          onPaste={(value) => pasteList("notes", value)}
                          onChange={(index, value) =>
                            updateList("notes", index, value)
                          }
                          onRemove={(index) => removeListItem("notes", index)}
                        />
                      </div>
                    )}

                    {activeStep === "publish" && (
                      <div className="grid gap-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <button
                            onClick={() => updateDraft("isActive", false)}
                            className={`rounded-lg border p-4 text-left ${
                              draft.isActive === false
                                ? "border-amber-400 bg-amber-50"
                                : "border-black/10 bg-white"
                            }`}
                          >
                            <div className="font-semibold">
                              Taslak olarak tut
                            </div>
                            <p className="mt-1 text-sm text-foreground/55">
                              Site ziyaretcileri bu turu gormez.
                            </p>
                          </button>
                          <button
                            onClick={() => updateDraft("isActive", true)}
                            className={`rounded-lg border p-4 text-left ${
                              draft.isActive !== false
                                ? "border-emerald-400 bg-emerald-50"
                                : "border-black/10 bg-white"
                            }`}
                          >
                            <div className="font-semibold">Yayina hazir</div>
                            <p className="mt-1 text-sm text-foreground/55">
                              Kaydedince sitede gorunur.
                            </p>
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <label className="inline-flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={draft.isFeatured || false}
                              onChange={(event) =>
                                updateDraft("isFeatured", event.target.checked)
                              }
                            />
                            Ana sayfada one cikar
                          </label>
                          <TextInput
                            label="Siralama"
                            type="number"
                            value={String(draft.order || 0)}
                            onChange={(value) =>
                              updateDraft("order", Number(value))
                            }
                          />
                        </div>

                        <div className="rounded-lg border border-black/10 bg-sand-light p-4">
                          <div className="flex items-center gap-2 font-semibold">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            Kaydetmeden once kontrol
                          </div>
                          <ul className="mt-3 space-y-2 text-sm text-foreground/65">
                            <li>Tur adi ve kategori dolu mu?</li>
                            <li>Ana fotograf dogru gorunuyor mu?</li>
                            <li>Kisa aciklama kartta temiz duruyor mu?</li>
                            <li>Yayinda mi, taslak mi istedigin gibi mi?</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {(status || error) && (
                      <div
                        className={`mt-5 rounded-lg p-4 text-sm ${
                          error
                            ? "border border-red-200 bg-red-50 text-red-700"
                            : "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {error || status}
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3 border-t border-black/10 pt-5">
                      <button
                        onClick={() => saveTour(false)}
                        disabled={isSaving}
                        className="inline-flex h-12 items-center gap-2 rounded-full border border-navy px-5 text-sm font-semibold text-navy disabled:opacity-60"
                      >
                        <Save className="h-4 w-4" />
                        Taslak Kaydet
                      </button>
                      <button
                        onClick={() => saveTour(true)}
                        disabled={isSaving}
                        className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-navy-deep disabled:opacity-60"
                      >
                        <Save className="h-4 w-4" />
                        {isSaving ? "Kaydediliyor..." : "Yayinla"}
                      </button>
                      <button
                        onClick={deleteTour}
                        className="inline-flex h-12 items-center gap-2 rounded-full border border-red-200 px-5 text-sm font-semibold text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <PreviewPanel draft={draft} completion={completion} />
        </div>
      )}
    </main>
  );
}

function PreviewPanel({
  draft,
  completion,
}: {
  draft: EditableTour;
  completion: number;
}) {
  return (
    <section className="min-w-0 rounded-lg border border-black/10 bg-white p-4 shadow-sm sm:p-5 xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gold">
            <Eye className="h-4 w-4" />
            2. Grid
          </span>
          <h2 className="mt-1 text-2xl font-semibold">Canli Onizleme</h2>
        </div>
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            draft.isActive !== false
              ? "bg-emerald-100 text-emerald-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {draft.isActive !== false ? "Yayinda" : "Taslak"}
        </span>
      </div>

      <div className="mt-5 rounded-lg bg-sand-light p-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
          <span>Hazirlik</span>
          <span>%{completion}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-gold"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-8">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/50">
            Tur Karti
          </h3>
          <div className="max-w-sm overflow-hidden">
            <TourCard tour={draft} />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-black/10">
          <img
            src={draft.image}
            alt={draft.title}
            className="h-64 w-full object-cover"
          />
          <div className="p-5">
            <div className="text-xs uppercase tracking-[0.24em] text-gold">
              {draft.category}
            </div>
            <h3 className="mt-3 font-display text-4xl leading-tight">
              {draft.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-foreground/65">
              {draft.description}
            </p>
            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
              <PreviewStat label="Sure" value={draft.duration} />
              <PreviewStat label="Katilim" value={draft.type} />
              <PreviewStat label="WhatsApp" value={draft.booking} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteContentManager({
  content,
  settings,
  mongoConfigured,
  status,
  error,
  isSaving,
  onContentChange,
  onSettingsChange,
  onSave,
}: {
  content: SiteContent;
  settings: SiteSettings;
  mongoConfigured: boolean;
  status: string;
  error: string;
  isSaving: boolean;
  onContentChange: (content: SiteContent) => void;
  onSettingsChange: (settings: SiteSettings) => void;
  onSave: () => void;
}) {
  const [section, setSection] = useState<
    "general" | "home" | "tours" | "about" | "contact"
  >("general");

  function updateSettings<K extends keyof SiteSettings>(
    key: K,
    value: SiteSettings[K],
  ) {
    onSettingsChange({ ...settings, [key]: value });
  }

  function updatePage<
    P extends keyof SiteContent,
    K extends keyof SiteContent[P],
  >(page: P, key: K, value: SiteContent[P][K]) {
    onContentChange({
      ...content,
      [page]: {
        ...content[page],
        [key]: value,
      },
    });
  }

  return (
    <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-5 sm:px-5 md:px-8 xl:grid-cols-[320px_1fr]">
      <aside className="rounded-lg border border-black/10 bg-white p-4 shadow-sm xl:sticky xl:top-6 xl:self-start">
        <div className="text-xs uppercase tracking-[0.24em] text-gold">
          Icerik CMS
        </div>
        <h2 className="mt-2 text-2xl font-semibold">Siteyi duzenle</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/55">
          Yazilar, butonlar, menu, WhatsApp ve footer bilgileri buradan degisir.
        </p>

        {!mongoConfigured && (
          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            Kayit icin MongoDB ayari gerekir.
          </div>
        )}

        <div className="mt-5 grid gap-2">
          {[
            ["general", "Genel Ayarlar"],
            ["home", "Ana Sayfa"],
            ["tours", "Turlar Sayfasi"],
            ["about", "Hakkimizda"],
            ["contact", "Iletisim"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setSection(id as typeof section)}
              className={`rounded-lg px-4 py-3 text-left text-sm font-semibold ${
                section === id
                  ? "bg-navy text-white"
                  : "bg-sand-light text-foreground/70 hover:bg-gold/20"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-navy-deep disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Kaydediliyor..." : "Siteyi Kaydet"}
        </button>

        {(status || error) && (
          <div
            className={`mt-4 rounded-lg p-3 text-sm ${
              error
                ? "border border-red-200 bg-red-50 text-red-700"
                : "border border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {error || status}
          </div>
        )}
      </aside>

      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        {section === "general" && (
          <div className="grid gap-5">
            <SectionTitle
              title="Genel Ayarlar"
              text="Logo yazisi, menu, WhatsApp, Instagram ve footer alanlari."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <TextInput
                label="Logo kisa yazisi"
                value={settings.brandInitials}
                onChange={(value) => updateSettings("brandInitials", value)}
              />
              <TextInput
                label="Logo ust yazisi"
                value={settings.brandTop}
                onChange={(value) => updateSettings("brandTop", value)}
              />
              <TextInput
                label="Logo alt yazisi"
                value={settings.brandBottom}
                onChange={(value) => updateSettings("brandBottom", value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput
                label="WhatsApp numarasi"
                helper="Ulke koduyla yazin. Ornek: 905431999411"
                value={settings.whatsappNumber}
                onChange={(value) => updateSettings("whatsappNumber", value)}
              />
              <TextInput
                label="Instagram linki"
                value={settings.instagramUrl}
                onChange={(value) => updateSettings("instagramUrl", value)}
              />
              <TextInput
                label="Instagram gorunen adi"
                value={settings.instagramLabel}
                onChange={(value) => updateSettings("instagramLabel", value)}
              />
              <TextInput
                label="Lokasyon"
                value={settings.location}
                onChange={(value) => updateSettings("location", value)}
              />
            </div>
            <TextArea
              label="WhatsApp hazir mesaji"
              value={settings.whatsappMessage}
              onChange={(value) => updateSettings("whatsappMessage", value)}
              rows={3}
            />
            <TextArea
              label="Footer aciklamasi"
              value={settings.footerDescription}
              onChange={(value) => updateSettings("footerDescription", value)}
              rows={4}
            />
            <TextInput
              label="Footer alt yazisi"
              value={settings.footerBottomText}
              onChange={(value) => updateSettings("footerBottomText", value)}
            />
            <LinkEditor
              label="Header / Footer menu linkleri"
              links={settings.navLinks}
              onChange={(navLinks) => updateSettings("navLinks", navLinks)}
            />
          </div>
        )}

        {section === "home" && (
          <div className="grid gap-5">
            <SectionTitle
              title="Ana Sayfa"
              text="Hero, butonlar, one cikan turlar ve alttaki WhatsApp alani."
            />
            <FieldGroup title="Hero Alani">
              <TextInput
                label="Ust kucuk yazi"
                value={content.home.heroEyebrow}
                onChange={(value) => updatePage("home", "heroEyebrow", value)}
              />
              <TextArea
                label="Ana baslik"
                value={content.home.heroTitle}
                onChange={(value) => updatePage("home", "heroTitle", value)}
                rows={2}
              />
              <TextArea
                label="Aciklama"
                value={content.home.heroDescription}
                onChange={(value) =>
                  updatePage("home", "heroDescription", value)
                }
                rows={3}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput
                  label="1. buton yazisi"
                  value={content.home.primaryButtonText}
                  onChange={(value) =>
                    updatePage("home", "primaryButtonText", value)
                  }
                />
                <TextInput
                  label="1. buton linki"
                  value={content.home.primaryButtonHref}
                  onChange={(value) =>
                    updatePage("home", "primaryButtonHref", value)
                  }
                />
                <TextInput
                  label="2. buton yazisi"
                  value={content.home.secondaryButtonText}
                  onChange={(value) =>
                    updatePage("home", "secondaryButtonText", value)
                  }
                />
              </div>
            </FieldGroup>
            <FieldGroup title="Neden Biz ve CTA">
              <TextInput
                label="Neden biz ust yazisi"
                value={content.home.whyEyebrow}
                onChange={(value) => updatePage("home", "whyEyebrow", value)}
              />
              <TextArea
                label="Neden biz baslik"
                value={content.home.whyTitle}
                onChange={(value) => updatePage("home", "whyTitle", value)}
                rows={2}
              />
              <TextArea
                label="Neden biz aciklama"
                value={content.home.whyDescription}
                onChange={(value) =>
                  updatePage("home", "whyDescription", value)
                }
                rows={4}
              />
              <TextInput
                label="Neden biz butonu"
                value={content.home.whyButtonText}
                onChange={(value) => updatePage("home", "whyButtonText", value)}
              />
              <TextInput
                label="One cikan ust yazisi"
                value={content.home.featuredEyebrow}
                onChange={(value) =>
                  updatePage("home", "featuredEyebrow", value)
                }
              />
              <TextArea
                label="One cikan basligi"
                value={content.home.featuredTitle}
                onChange={(value) => updatePage("home", "featuredTitle", value)}
                rows={2}
              />
              <TextInput
                label="Turlar link yazisi"
                value={content.home.featuredLinkText}
                onChange={(value) =>
                  updatePage("home", "featuredLinkText", value)
                }
              />
              <TextInput
                label="CTA ust yazisi"
                value={content.home.ctaEyebrow}
                onChange={(value) => updatePage("home", "ctaEyebrow", value)}
              />
              <TextArea
                label="CTA baslik"
                value={content.home.ctaTitle}
                onChange={(value) => updatePage("home", "ctaTitle", value)}
                rows={2}
              />
              <TextArea
                label="CTA aciklama"
                value={content.home.ctaDescription}
                onChange={(value) =>
                  updatePage("home", "ctaDescription", value)
                }
                rows={3}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput
                  label="CTA 1. buton"
                  value={content.home.ctaPrimaryText}
                  onChange={(value) =>
                    updatePage("home", "ctaPrimaryText", value)
                  }
                />
                <TextInput
                  label="CTA 2. buton"
                  value={content.home.ctaSecondaryText}
                  onChange={(value) =>
                    updatePage("home", "ctaSecondaryText", value)
                  }
                />
              </div>
            </FieldGroup>
          </div>
        )}

        {section === "tours" && (
          <PageHeroEditor
            title="Turlar Sayfasi"
            eyebrow={content.tours.heroEyebrow}
            heading={content.tours.heroTitle}
            description={content.tours.heroDescription}
            button={content.tours.whatsappButtonText}
            buttonLabel="WhatsApp buton yazisi"
            onEyebrow={(value) => updatePage("tours", "heroEyebrow", value)}
            onHeading={(value) => updatePage("tours", "heroTitle", value)}
            onDescription={(value) =>
              updatePage("tours", "heroDescription", value)
            }
            onButton={(value) =>
              updatePage("tours", "whatsappButtonText", value)
            }
          />
        )}

        {section === "about" && (
          <div className="grid gap-5">
            <PageHeroEditor
              title="Hakkimizda Sayfasi"
              eyebrow={content.about.heroEyebrow}
              heading={content.about.heroTitle}
              description={content.about.heroDescription}
              onEyebrow={(value) => updatePage("about", "heroEyebrow", value)}
              onHeading={(value) => updatePage("about", "heroTitle", value)}
              onDescription={(value) =>
                updatePage("about", "heroDescription", value)
              }
            />
            <FieldGroup title="Degerler Alani">
              <TextInput
                label="Ust yazi"
                value={content.about.valuesEyebrow}
                onChange={(value) =>
                  updatePage("about", "valuesEyebrow", value)
                }
              />
              <TextArea
                label="Baslik"
                value={content.about.valuesTitle}
                onChange={(value) => updatePage("about", "valuesTitle", value)}
                rows={2}
              />
              <ValueEditor
                values={content.about.values}
                onChange={(values) => updatePage("about", "values", values)}
              />
            </FieldGroup>
          </div>
        )}

        {section === "contact" && (
          <div className="grid gap-5">
            <PageHeroEditor
              title="Iletisim Sayfasi"
              eyebrow={content.contact.heroEyebrow}
              heading={content.contact.heroTitle}
              description={content.contact.heroDescription}
              onEyebrow={(value) => updatePage("contact", "heroEyebrow", value)}
              onHeading={(value) => updatePage("contact", "heroTitle", value)}
              onDescription={(value) =>
                updatePage("contact", "heroDescription", value)
              }
            />
            <FieldGroup title="Iletisim Kartlari">
              <TextArea
                label="WhatsApp kart basligi"
                value={content.contact.whatsappCardTitle}
                onChange={(value) =>
                  updatePage("contact", "whatsappCardTitle", value)
                }
                rows={2}
              />
              <TextArea
                label="WhatsApp kart aciklamasi"
                value={content.contact.whatsappCardDescription}
                onChange={(value) =>
                  updatePage("contact", "whatsappCardDescription", value)
                }
                rows={3}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput
                  label="WhatsApp butonu"
                  value={content.contact.whatsappButtonText}
                  onChange={(value) =>
                    updatePage("contact", "whatsappButtonText", value)
                  }
                />
                <TextInput
                  label="Instagram basligi"
                  value={content.contact.instagramTitle}
                  onChange={(value) =>
                    updatePage("contact", "instagramTitle", value)
                  }
                />
                <TextInput
                  label="Lokasyon basligi"
                  value={content.contact.locationTitle}
                  onChange={(value) =>
                    updatePage("contact", "locationTitle", value)
                  }
                />
                <TextInput
                  label="Harita aramasi"
                  value={content.contact.mapQuery}
                  onChange={(value) => updatePage("contact", "mapQuery", value)}
                />
              </div>
            </FieldGroup>
          </div>
        )}
      </section>
    </div>
  );
}

function GalleryManager({
  images,
  status,
  error,
  isUploading,
  onUpload,
  onSeed,
}: {
  images: EditableGalleryImage[];
  status: string;
  error: string;
  isUploading: boolean;
  onUpload: (file: File) => void;
  onSeed: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-5 md:px-8">
      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-gold">
              Galeri Yonetimi
            </div>
            <h2 className="mt-1 text-2xl font-semibold">
              Site galeri fotograflari
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-foreground/55">
              Galeri sayfasinda gorunecek fotograflari buradan ekleyin. Mevcut
              site fotograflarini tek tusla MongoDB galerisine aktarabilirsiniz.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onSeed}
              className="h-11 rounded-full border border-navy px-4 text-sm font-semibold text-navy"
            >
              Mevcut Fotograflari Aktar
            </button>
            <ImageUploadButton
              label="Galeriye Fotograf Yukle"
              helper="R2'ye yukler ve galeri sayfasina ekler."
              isUploading={isUploading}
              onUpload={onUpload}
            />
          </div>
        </div>

        {(status || error) && (
          <div
            className={`mt-5 rounded-lg p-4 text-sm ${
              error
                ? "border border-red-200 bg-red-50 text-red-700"
                : "border border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {error || status}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <figure
              key={image.id || image.src}
              className="overflow-hidden rounded-lg border border-black/10 bg-sand-light"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="p-3 text-xs text-foreground/60">
                <div className="line-clamp-1 font-semibold text-foreground">
                  {image.alt || "Galeri gorseli"}
                </div>
                <div className="mt-1 line-clamp-1">{image.src}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

function TransferManager({
  tours,
  onSelect,
  onCreate,
}: {
  tours: EditableTour[];
  onSelect: (slug: string) => void;
  onCreate: () => void;
}) {
  const transferTours = tours.filter(
    (tour) =>
      tour.category.toLocaleLowerCase("tr") === "transfer" ||
      tour.title.toLocaleLowerCase("tr").includes("transfer"),
  );

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-5 md:px-8">
      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-gold">
              Transfer Yonetimi
            </div>
            <h2 className="mt-1 text-2xl font-semibold">
              Transfer kartini yonet
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-foreground/55">
              Transfer sayfasi, Transfer kategorisindeki tur kartini kullanir.
              Buradan transfer kartini acip duzenleyebilirsiniz.
            </p>
          </div>
          <button
            onClick={onCreate}
            className="h-11 rounded-full bg-navy px-5 text-sm font-semibold text-white"
          >
            Transfer Karti Olustur
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {transferTours.map((tour) => (
            <div
              key={tour.id || tour.slug}
              className="rounded-lg border border-black/10 bg-sand-light p-4"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="aspect-[16/9] w-full rounded-lg object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold">{tour.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-foreground/60">
                {tour.short}
              </p>
              <button
                onClick={() => onSelect(tour.slug)}
                className="mt-4 h-10 rounded-full bg-gold px-4 text-sm font-semibold text-navy-deep"
              >
                Bu Transferi Duzenle
              </button>
            </div>
          ))}
          {transferTours.length === 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              Henuz transfer karti yok. "Transfer Karti Olustur" ile baslayin.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.24em] text-gold">
        Site Icerigi
      </div>
      <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-foreground/55">{text}</p>
    </div>
  );
}

function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-black/10 bg-sand-light p-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/50">
        {title}
      </h3>
      <div className="mt-4 grid gap-4">{children}</div>
    </div>
  );
}

function PageHeroEditor({
  title,
  eyebrow,
  heading,
  description,
  button,
  buttonLabel,
  onEyebrow,
  onHeading,
  onDescription,
  onButton,
}: {
  title: string;
  eyebrow: string;
  heading: string;
  description: string;
  button?: string;
  buttonLabel?: string;
  onEyebrow: (value: string) => void;
  onHeading: (value: string) => void;
  onDescription: (value: string) => void;
  onButton?: (value: string) => void;
}) {
  return (
    <div className="grid gap-5">
      <SectionTitle
        title={title}
        text="Sayfanin ust alani, basligi, aciklamasi ve varsa buton metni."
      />
      <FieldGroup title="Sayfa Ust Alani">
        <TextInput
          label="Ust kucuk yazi"
          value={eyebrow}
          onChange={onEyebrow}
        />
        <TextArea
          label="Ana baslik"
          value={heading}
          onChange={onHeading}
          rows={2}
        />
        <TextArea
          label="Aciklama"
          value={description}
          onChange={onDescription}
          rows={4}
        />
        {typeof button === "string" && onButton && (
          <TextInput
            label={buttonLabel || "Buton yazisi"}
            value={button}
            onChange={onButton}
          />
        )}
      </FieldGroup>
    </div>
  );
}

function LinkEditor({
  label,
  links,
  onChange,
}: {
  label: string;
  links: { label: string; href: string }[];
  onChange: (links: { label: string; href: string }[]) => void;
}) {
  function update(index: number, key: "label" | "href", value: string) {
    onChange(
      links.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [key]: value } : link,
      ),
    );
  }

  return (
    <div className="rounded-lg border border-black/10 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold">{label}</div>
        <button
          onClick={() =>
            onChange([...links, { label: "Yeni Link", href: "/" }])
          }
          className="h-9 rounded-full bg-navy px-3 text-xs font-semibold text-white"
        >
          Link Ekle
        </button>
      </div>
      <div className="mt-4 grid gap-3">
        {links.map((link, index) => (
          <div
            key={`${link.href}-${index}`}
            className="grid gap-2 md:grid-cols-[1fr_1fr_auto]"
          >
            <input
              value={link.label}
              onChange={(event) => update(index, "label", event.target.value)}
              className="h-11 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-gold"
              placeholder="Menu adi"
            />
            <input
              value={link.href}
              onChange={(event) => update(index, "href", event.target.value)}
              className="h-11 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-gold"
              placeholder="/turlar"
            />
            <button
              onClick={() => onChange(links.filter((_, i) => i !== index))}
              className="h-11 rounded-lg border border-red-200 px-3 text-sm font-semibold text-red-700"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ValueEditor({
  values,
  onChange,
}: {
  values: { title: string; text: string }[];
  onChange: (values: { title: string; text: string }[]) => void;
}) {
  function update(index: number, key: "title" | "text", value: string) {
    onChange(
      values.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    );
  }

  return (
    <div className="grid gap-3">
      {values.map((value, index) => (
        <div
          key={`${value.title}-${index}`}
          className="rounded-lg bg-white p-4"
        >
          <div className="grid gap-3">
            <input
              value={value.title}
              onChange={(event) => update(index, "title", event.target.value)}
              className="h-11 rounded-lg border border-black/10 px-3 text-sm font-semibold outline-none focus:border-gold"
              placeholder="Kart basligi"
            />
            <textarea
              value={value.text}
              onChange={(event) => update(index, "text", event.target.value)}
              rows={3}
              className="resize-y rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-gold"
              placeholder="Kart aciklamasi"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ImageUploadButton({
  label,
  helper,
  isUploading,
  onUpload,
}: {
  label: string;
  helper: string;
  isUploading: boolean;
  onUpload: (file: File) => void;
}) {
  return (
    <label className="flex cursor-pointer flex-col rounded-lg border border-dashed border-navy/30 bg-sand-light p-4 transition-colors hover:border-gold hover:bg-gold/10">
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
        <ImageIcon className="h-4 w-4" />
        {isUploading ? "Yukleniyor..." : label}
      </span>
      <span className="mt-2 text-xs leading-relaxed text-foreground/55">
        {helper}
      </span>
      <span className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-navy px-4 text-sm font-semibold text-white">
        Dosya Sec
      </span>
      <input
        type="file"
        accept="image/*"
        disabled={isUploading}
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";

          if (file) {
            onUpload(file);
          }
        }}
        className="sr-only"
      />
    </label>
  );
}

function ListEditor({
  label,
  helper,
  values,
  placeholder,
  onAdd,
  onPaste,
  onChange,
  onRemove,
}: {
  label: string;
  helper: string;
  values: string[];
  placeholder: string;
  onAdd: () => void;
  onPaste: (value: string) => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}) {
  const [bulkText, setBulkText] = useState("");

  return (
    <div className="rounded-lg border border-black/10 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{label}</div>
          <p className="mt-1 text-xs text-foreground/55">{helper}</p>
        </div>
        <button
          onClick={onAdd}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-navy px-3 text-xs font-semibold text-white"
        >
          <ListPlus className="h-3.5 w-3.5" />
          Madde Ekle
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {values.length === 0 && (
          <div className="rounded-lg bg-sand-light p-3 text-sm text-foreground/50">
            Henuz madde yok. "Madde Ekle" ile baslayabilirsiniz.
          </div>
        )}
        {values.map((value, index) => (
          <div key={`${label}-${index}`} className="flex gap-2">
            <input
              value={value}
              placeholder={placeholder}
              onChange={(event) => onChange(index, event.target.value)}
              className="h-11 min-w-0 flex-1 rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-gold"
            />
            <button
              onClick={() => onRemove(index)}
              className="h-11 rounded-lg border border-red-200 px-3 text-sm font-semibold text-red-700"
            >
              Sil
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-sand-light p-3">
        <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">
          Toplu yapistir
          <textarea
            value={bulkText}
            onChange={(event) => setBulkText(event.target.value)}
            placeholder={"Her satira bir madde yazin"}
            rows={3}
            className="resize-y rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-gold"
          />
        </label>
        <button
          onClick={() => {
            onPaste(bulkText);
            setBulkText("");
          }}
          className="mt-3 h-9 rounded-full border border-navy px-4 text-xs font-semibold text-navy"
        >
          Toplu Listeye Cevir
        </button>
      </div>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  helper,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helper?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-gold"
      />
      {helper && (
        <span className="text-xs font-normal text-foreground/50">{helper}</span>
      )}
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
  helper,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  helper?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="resize-y rounded-lg border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-gold"
      />
      {helper && (
        <span className="text-xs font-normal text-foreground/50">{helper}</span>
      )}
    </label>
  );
}

function PreviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-sand-light p-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/45">
        {label}
      </div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}
