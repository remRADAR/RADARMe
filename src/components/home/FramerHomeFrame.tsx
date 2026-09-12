import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight, Play } from "lucide-react";
import { reportHomepageAssetError, reportHomepageAssetLoad } from "@/lib/homepage-asset-monitor";

const tickerLogos = [
  "ticker-logo-01",
  "ticker-logo-02",
  "ticker-logo-03",
  "ticker-logo-04",
  "ticker-logo-05",
  "ticker-logo-06",
  "ticker-logo-07",
  "ticker-logo-08",
];

const leftArtists = ["Makama", "Odenose", "KEASUNGS", "Moelogo", "TELMAN"];
const rightArtists = ["Fresh", "Motherland", "Discovery", "Magazine", "The RADARMan"];
type HeroSlide = {
  id: string;
  avif?: string;
  webp: string;
  jpg?: string;
  preferredFormat: "avif" | "webp";
};

const heroSlides: HeroSlide[] = [
  {
    id: "shutter-hero-01",
    avif: "/media/framer-home/shutter-hero.avif",
    webp: "/media/framer-home/shutter-hero.webp",
    jpg: "/media/framer-home/shutter-hero.jpg",
    preferredFormat: "avif",
  },
  {
    id: "shutter-hero-02",
    webp: "/media/framer-home/shutter-hero-02.webp",
    preferredFormat: "webp",
  },
  {
    id: "shutter-hero-03",
    webp: "/media/framer-home/shutter-hero-03.webp",
    preferredFormat: "webp",
  },
  {
    id: "shutter-hero-04",
    webp: "/media/framer-home/shutter-hero-04.webp",
    preferredFormat: "webp",
  },
  {
    id: "shutter-hero-05",
    webp: "/media/framer-home/shutter-hero-05.webp",
    preferredFormat: "webp",
  },
];

export function FramerHomeFrame() {
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="framer-home-frame" aria-labelledby="framer-home-title">
      <div className="framer-home-frame__hero">
        <div className="framer-home-frame__slides" aria-live="polite">
          {heroSlides.map((slide, index) => (
            <picture
              key={slide.id}
              className={`framer-home-frame__image${index === activeHero ? " is-active" : ""}`}
              aria-hidden={index !== activeHero}
            >
              {slide.avif && <source srcSet={slide.avif} type="image/avif" />}
              <source srcSet={slide.webp} type="image/webp" />
              <img
                src={slide.jpg ?? slide.webp}
                alt=""
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                onLoad={(event) =>
                  reportHomepageAssetLoad({
                    assetId: slide.id,
                    kind: "hero",
                    image: event.currentTarget,
                    preferredFormat: slide.preferredFormat,
                  })
                }
                onError={(event) =>
                  reportHomepageAssetError({
                    assetId: slide.id,
                    kind: "hero",
                    image: event.currentTarget,
                    preferredFormat: slide.preferredFormat,
                  })
                }
              />
            </picture>
          ))}
        </div>
        <div className="framer-home-frame__wash" aria-hidden="true" />

        <div className="framer-home-frame__artists framer-home-frame__artists--left">
          <span className="framer-home-frame__artist-label">•</span>
          {leftArtists.map((artist) => (
            <span key={artist}>{artist}</span>
          ))}
        </div>
        <div className="framer-home-frame__artists framer-home-frame__artists--right">
          {rightArtists.map((artist) => (
            <span key={artist}>{artist}</span>
          ))}
          <span className="framer-home-frame__artist-label">•</span>
        </div>

        <div className="framer-home-frame__index framer-home-frame__index--left">
          {String(activeHero + 1).padStart(2, "0")}
        </div>
        <div className="framer-home-frame__index framer-home-frame__index--right">05</div>
        <div className="framer-home-frame__hero-cue" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="framer-home-frame__brand-band">
        <h1 id="framer-home-title" className="framer-home-frame__wordmark">
          RADAR<span>Charts</span>
        </h1>
        <p>Experience the artist operating system by RADARCharts</p>
      </div>

      <div className="framer-home-frame__ticker" aria-label="RADARCharts ecosystem partners">
        <div className="framer-home-frame__ticker-track">
          {[...tickerLogos, ...tickerLogos].map((logo, index) => (
            <picture key={`${logo}-${index}`}>
              <source srcSet={`/media/framer-home/${logo}.webp`} type="image/webp" />
              <img
                src={`/media/framer-home/${logo}.webp`}
                alt=""
                loading="lazy"
                decoding="async"
                onLoad={(event) =>
                  reportHomepageAssetLoad({
                    assetId: `${logo}-${index}`,
                    kind: "ticker",
                    image: event.currentTarget,
                    preferredFormat: "webp",
                  })
                }
                onError={(event) =>
                  reportHomepageAssetError({
                    assetId: `${logo}-${index}`,
                    kind: "ticker",
                    image: event.currentTarget,
                    preferredFormat: "webp",
                  })
                }
              />
            </picture>
          ))}
        </div>
        <Link className="framer-home-frame__ticker-now" to="/network/magazine">
          <span className="framer-home-frame__ticker-play">
            <Play size={11} fill="currentColor" />
          </span>
          <span>TELMAN — Moov Different</span>
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="framer-home-frame__actions">
        <Link to="/radarmusic" className="framer-home-frame__action">
          <span>RADARMusic</span>
          <ArrowUpRight size={14} />
        </Link>
        <Link to="/network/magazine" className="framer-home-frame__action">
          <span>Read the magazine</span>
          <ArrowUpRight size={14} />
        </Link>
        <Link
          to="/intelligence"
          className="framer-home-frame__action framer-home-frame__action--gold"
        >
          <span>Open your signal</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
