import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight, Play } from "lucide-react";

const tickerLogos = [
  "/media/framer-home/ticker-logo-01.png",
  "/media/framer-home/ticker-logo-02.png",
  "/media/framer-home/ticker-logo-03.png",
  "/media/framer-home/ticker-logo-04.png",
  "/media/framer-home/ticker-logo-05.png",
  "/media/framer-home/ticker-logo-06.png",
  "/media/framer-home/ticker-logo-07.png",
  "/media/framer-home/ticker-logo-08.png",
];

const leftArtists = ["Makama", "Odenose", "KEASUNGS", "Moelogo", "TELMAN"];
const rightArtists = ["Fresh", "Motherland", "Discovery", "Magazine", "The RADARMan"];

export function FramerHomeFrame() {
  return (
    <section className="framer-home-frame" aria-labelledby="framer-home-title">
      <div className="framer-home-frame__hero">
        <img
          src="/media/framer-home/shutter-hero.jpg"
          alt=""
          className="framer-home-frame__image"
          fetchPriority="high"
          decoding="async"
        />
        <div className="framer-home-frame__wash" aria-hidden="true" />
        <div className="framer-home-frame__shutters" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} style={{ animationDelay: `${index * 45}ms` }} />
          ))}
        </div>

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

        <div className="framer-home-frame__index framer-home-frame__index--left">01</div>
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
            <img key={`${logo}-${index}`} src={logo} alt="" loading="lazy" />
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
