import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Sparkles, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getLocalAlbums, getPhoto } from "../photos";

type Album = ReturnType<typeof getLocalAlbums>[number];
const categories = ["facilities", "services", "daily", "events"];

function AlbumLightbox({ album, onClose }: { album: Album; onClose: () => void }) {
  const { t } = useTranslation();
  const dialog = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = album.images[activeIndex];
  const move = (step: number) => setActiveIndex((current) => (current + step + album.images.length) % album.images.length);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="photo-dialog"
      aria-labelledby="album-title"
      onCancel={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      }}
    >
      <button className="photo-dialog-close" onClick={onClose} aria-label={t("gallery.close")}><X /></button>
      <div className="photo-dialog-inner">
        <div className="photo-dialog-main">
          <img src={active.url} alt={active.alt} width={active.width} height={active.height} />
          <button className="photo-dialog-prev" onClick={() => move(-1)} aria-label={t("gallery.previous")}><ChevronLeft /></button>
          <button className="photo-dialog-next" onClick={() => move(1)} aria-label={t("gallery.next")}><ChevronRight /></button>
        </div>
        <div className="photo-dialog-info">
          <span className="text-sm font-bold text-brand-green">{t(`gallery.categories.${album.category}`)}</span>
          <h2 id="album-title" className="mt-2 text-2xl font-bold text-brand-dark">{album.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-dark/70">{album.description}</p>
          <p className="my-5 text-sm text-brand-dark/70" aria-live="polite">
            <strong className="mb-1 block text-brand-dark">{activeIndex + 1} / {album.images.length}</strong>
            {active.alt}
          </p>
          <div className="photo-dialog-thumbs">
            {album.images.map((photo, index) => (
              <button key={photo.url} aria-label={t("gallery.viewImage", { number: index + 1 })} aria-pressed={activeIndex === index} onClick={() => setActiveIndex(index)}>
                <img src={photo.thumbnail} alt="" loading="lazy" width={80} height={64} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function GalleryPage() {
  const { t, i18n } = useTranslation();
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const albums = getLocalAlbums(t, i18n.resolvedLanguage ?? "vi");
  const filtered = category === "all" ? albums : albums.filter((album) => album.category === category);
  const selected = albums.find((album) => album.id === selectedId);
  const hero = getPhoto("everyday-smiles", i18n.resolvedLanguage);

  return (
    <>
      <section className="gallery-page-hero bg-brand-light px-6 pb-16 pt-36 md:pb-20 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-green"><Sparkles size={17} aria-hidden="true" />{t("gallery.hero.eyebrow")}</span>
            <h1 className="text-4xl font-bold leading-tight text-brand-dark md:text-5xl">{t("gallery.hero.title")}</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-brand-dark/70">{t("gallery.hero.text")}</p>
          </div>
          <img src={hero.url} alt={hero.alt} width={hero.width} height={hero.height} fetchPriority="high" className="aspect-[4/3] w-full rounded-[32px] object-cover" />
        </div>
      </section>
      <section className="px-6 py-12 md:py-20" aria-label={t("navigation.gallery")}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap gap-3" aria-label={t("navigation.gallery")}>
            {["all", ...categories].map((value) => (
              <button key={value} type="button" className={`gallery-filter ${category === value ? "active" : ""}`} aria-pressed={category === value} onClick={() => setCategory(value)}>
                {t(value === "all" ? "gallery.all" : `gallery.categories.${value}`)}
              </button>
            ))}
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((album) => (
              <button key={album.id} type="button" className="gallery-album group" aria-haspopup="dialog" onClick={() => setSelectedId(album.id)}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={album.images[0].thumbnail} alt={album.images[0].alt} width={album.images[0].width} height={album.images[0].height} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-brand-dark"><Images size={16} aria-hidden="true" />{t("gallery.imagesCount", { count: album.images.length })}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wide text-brand-green">{t(`gallery.categories.${album.category}`)}</span>
                  <h2 className="mb-3 mt-2 text-xl font-bold text-brand-dark">{album.title}</h2>
                  <p className="text-sm leading-relaxed text-brand-dark/70">{album.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {selected && <AlbumLightbox key={selected.id} album={selected} onClose={() => setSelectedId(null)} />}
    </>
  );
}
