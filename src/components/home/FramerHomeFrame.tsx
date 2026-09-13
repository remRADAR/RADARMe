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

  return (
    <section className="framer-home-frame" aria-labelledby="framer-home-title">
      <div className="framer-home-frame__hero" aria-label="RADARMe image showcase">
        <div className="framer-home-frame__slides" aria-live="polite">
          {driveHeroImages.map((image, index) => (
            <figure
              key={image.src}
              className={`framer-home-frame__image${index === activeHero ? " is-active" : ""}`}
              aria-hidden={index !== activeHero}
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
    </section>
  );
}
