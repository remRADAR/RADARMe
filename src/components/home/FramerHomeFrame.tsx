import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Play } from "lucide-react";
import { reportHomepageAssetError, reportHomepageAssetLoad } from "@/lib/homepage-asset-monitor";

const tickerLogos = Array.from(
  { length: 8 },
  (_, index) => `/media/framer-home/ticker-logo-0${index + 1}.png`,
);
const leftArtists = ["Makama", "Odenose", "KEASUNGS", "Moelogo", "TELMAN"];
const rightArtists = ["Fresh", "Motherland", "Discovery", "Magazine", "The RADARMan"];
const artistList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
const artistItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 0.7, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

export function FramerHomeFrame() {
  return (
    <section className="framer-home-frame" aria-labelledby="framer-home-title">
      <div className="framer-home-frame__hero">
        <motion.picture
          className="framer-home-frame__image"
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/media/framer-home/shutter-hero.jpg"
            alt=""
            fetchPriority="high"
            decoding="async"
            onLoad={(event) =>
              reportHomepageAssetLoad({
                assetId: "shutter-hero",
                kind: "hero",
                image: event.currentTarget,
                preferredFormat: "jpeg",
              })
            }
            onError={(event) =>
              reportHomepageAssetError({
                assetId: "shutter-hero",
                kind: "hero",
                image: event.currentTarget,
                preferredFormat: "jpeg",
              })
            }
          />
        </motion.picture>
        <div className="framer-home-frame__wash" aria-hidden="true" />

        <motion.div
          className="framer-home-frame__artists framer-home-frame__artists--left"
          variants={artistList}
          initial="hidden"
          animate="visible"
        >
          <span className="framer-home-frame__artist-label">•</span>
          {leftArtists.map((artist) => (
            <motion.span key={artist} variants={artistItem}>
              {artist}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          className="framer-home-frame__artists framer-home-frame__artists--right"
          variants={artistList}
          initial="hidden"
          animate="visible"
        >
          {rightArtists.map((artist) => (
            <motion.span key={artist} variants={artistItem}>
              {artist}
            </motion.span>
          ))}
          <span className="framer-home-frame__artist-label">•</span>
        </motion.div>

        <motion.div
          className="framer-home-frame__index framer-home-frame__index--left"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          01
        </motion.div>
        <motion.div
          className="framer-home-frame__index framer-home-frame__index--right"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          05
        </motion.div>
        <motion.div
          className="framer-home-frame__hero-cue"
          aria-label="Scroll for more"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span />
          <span />
          <span />
        </motion.div>
      </div>

      <div className="framer-home-frame__brand-band">
        <h1 id="framer-home-title" className="framer-home-frame__wordmark">
          RADAR<span>Charts</span>
        </h1>
        <p>Experience the artist operating system by RADARCharts</p>
      </div>

      <div className="framer-home-frame__ticker" aria-label="RADARCharts ecosystem partners">
        <motion.div
          className="framer-home-frame__ticker-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[...tickerLogos, ...tickerLogos].map((logo, index) => (
            <picture key={`${logo}-${index}`}>
              <img
                src={logo}
                alt=""
                loading="lazy"
                decoding="async"
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
        </motion.div>
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
