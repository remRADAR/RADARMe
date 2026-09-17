import { ChevronRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { reportHomepageAssetError, reportHomepageAssetLoad } from "@/lib/homepage-asset-monitor";
import { driveHeroImages } from "./driveHeroImages";

const tickerLogos = Array.from(
  { length: 8 },
  (_, index) => `/media/framer-home/ticker-logo-0${index + 1}.png`,
);

function reportLoadedImage(image: HTMLImageElement, report: (image: HTMLImageElement) => void) {
  if (image.complete && image.naturalWidth > 0) report(image);
}

export function FramerHomeFrame() {
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % driveHeroImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const activeImage = driveHeroImages[activeHero];
  const nextImage = driveHeroImages[(activeHero + 1) % driveHeroImages.length];

  return (
    <section
      className="framer-home-frame rounded-[2rem] border border-white/10 shadow-[0_24px_80px_-32px_rgb(0_0_0_/_0.9)]"
      aria-labelledby="framer-home-title"
    >
      <div className="framer-home-frame__hero" aria-label="RADARMe image showcase">
        <div className="framer-home-frame__slides" aria-live="polite">
          {[activeImage, nextImage].map((image, index) => (
            <figure
              key={image.src}
              className={`framer-home-frame__image${index === 0 ? " is-active" : ""}`}
              aria-hidden={index !== 0}
            >
              <img
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                ref={(element) => {
                  if (element) {
                    reportLoadedImage(element, (loadedImage) =>
                      reportHomepageAssetLoad({
                        assetId: image.name,
                        kind: "hero",
                        image: loadedImage,
                        preferredFormat: "webp",
                      }),
                    );
                  }
                }}
                onLoad={(event) =>
                  reportHomepageAssetLoad({
                    assetId: image.name,
                    kind: "hero",
                    image: event.currentTarget,
                    preferredFormat: "webp",
                  })
                }
                onError={(event) =>
                  reportHomepageAssetError({
                    assetId: image.name,
                    kind: "hero",
                    image: event.currentTarget,
                    preferredFormat: "webp",
                  })
                }
              />
            </figure>
          ))}
        </div>

        <div className="framer-home-frame__wash" aria-hidden="true" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-5 sm:p-7 lg:p-9">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full border border-white/20 bg-black/25 text-sm font-semibold text-white backdrop-blur-xl">
              R
            </div>
            <div>
              <p className="font-display text-sm font-semibold tracking-[-0.02em] text-white sm:text-base">
                RADARMe
              </p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
                The iNDUSTRYKit
              </p>
            </div>
          </div>
          <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-xl">
            Home / 01
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 p-5 sm:p-7 lg:p-9">
          <div className="max-w-[min(34rem,76%)] text-white">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Artist ecosystem / live signal
            </p>
            <h1
              id="framer-home-title"
              className="font-display text-[clamp(2.5rem,8vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.075em]"
            >
              Find your next move.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              Music, opportunity and community — tuned to where you are going next.
            </p>
          </div>

          <div className="hidden shrink-0 flex-col items-end gap-2 text-right sm:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
              Featured signal
            </span>
            <span className="flex items-center gap-2 text-xs font-medium text-white">
              Lagos / 50 <ChevronRight size={14} aria-hidden />
            </span>
          </div>
        </div>

        <div
          className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-7"
          aria-label={`Hero image ${activeHero + 1} of ${driveHeroImages.length}`}
        >
          {driveHeroImages.slice(0, 5).map((image, index) => (
            <span
              key={image.src}
              className={`h-1 rounded-full transition-all duration-300 ${index === activeHero % 5 ? "w-7 bg-white" : "w-1.5 bg-white/45"}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className="framer-home-frame__brand-band px-5 py-8 text-left sm:px-8 sm:py-10 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              RADARMe / artist-first
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
              Your command centre for releases, discovery, services and the people moving culture
              forward.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.05] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/65 sm:self-auto">
            <Play size={11} fill="currentColor" aria-hidden />
            Explore the signal
          </span>
        </div>
      </div>

      <div className="framer-home-frame__ticker" aria-label="RADARMe ecosystem partners">
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
        <span className="framer-home-frame__ticker-now">
          <span className="framer-home-frame__ticker-play" aria-hidden>
            <Play size={9} fill="currentColor" />
          </span>
          Live across RADARMe
        </span>
      </div>
    </section>
  );
}
