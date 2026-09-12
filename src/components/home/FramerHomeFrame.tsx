import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { reportHomepageAssetError, reportHomepageAssetLoad } from "@/lib/homepage-asset-monitor";

const tickerLogos = Array.from(
  { length: 8 },
  (_, index) => `/media/framer-home/ticker-logo-0${index + 1}.png`,
);
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

function reportLoadedImage(image: HTMLImageElement, report: (image: HTMLImageElement) => void) {
  if (image.complete && image.naturalWidth > 0) report(image);
}

function playShutterSnap() {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const now = context.currentTime;
  const gain = context.createGain();
  const oscillator = context.createOscillator();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(1450, now);
  oscillator.frequency.exponentialRampToValueAtTime(420, now + 0.075);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.16, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.12);
  oscillator.addEventListener("ended", () => void context.close(), { once: true });
}

export function FramerHomeFrame() {
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveHero((current) => {
        const next = (current + 1) % heroSlides.length;
        playShutterSnap();
        return next;
      });
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
                ref={(image) => {
                  if (image) {
                    reportLoadedImage(image, (loadedImage) =>
                      reportHomepageAssetLoad({
                        assetId: slide.id,
                        kind: "hero",
                        image: loadedImage,
                        preferredFormat: slide.preferredFormat,
                      }),
                    );
                  }
                }}
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
        <div className="framer-home-frame__hero-cue" aria-label="Images change every five seconds">
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
              <img
                src={logo}
                alt=""
                loading="lazy"
                decoding="async"
                ref={(image) => {
                  if (image) {
                    reportLoadedImage(image, (loadedImage) =>
                      reportHomepageAssetLoad({
                        assetId: `${logo}-${index}`,
                        kind: "ticker",
                        image: loadedImage,
                        preferredFormat: "png",
                      }),
                    );
                  }
                }}
                onLoad={(event) =>
                  reportHomepageAssetLoad({
                    assetId: `${logo}-${index}`,
                    kind: "ticker",
                    image: event.currentTarget,
                    preferredFormat: "png",
                  })
                }
                onError={(event) =>
                  reportHomepageAssetError({
                    assetId: `${logo}-${index}`,
                    kind: "ticker",
                    image: event.currentTarget,
                    preferredFormat: "png",
                  })
                }
              />
            </picture>
          ))}
        </div>
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
