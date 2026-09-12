import { useEffect, useRef, useState } from "react";

const DISPLAY_MS = 8000;
const EXIT_MS = 1200;

export function FramerOpening() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const dismissed = useRef(false);
  const displayTimer = useRef<number | undefined>(undefined);
  const exitTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dismissDelay = reducedMotion ? 550 : DISPLAY_MS;

    const dismiss = () => {
      if (dismissed.current) return;
      dismissed.current = true;
      if (displayTimer.current) window.clearTimeout(displayTimer.current);
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
      setExiting(true);
      exitTimer.current = window.setTimeout(() => setVisible(false), reducedMotion ? 450 : EXIT_MS);
    };

    displayTimer.current = window.setTimeout(dismiss, dismissDelay);
    window.addEventListener("radarme-opening-dismiss", dismiss);

    return () => {
      if (displayTimer.current) window.clearTimeout(displayTimer.current);
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
      window.removeEventListener("radarme-opening-dismiss", dismiss);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => window.dispatchEvent(new Event("radarme-opening-dismiss"));

  return (
    <div
      className={`framer-opening${exiting ? " is-exiting" : ""}`}
      role="dialog"
      aria-label="RADARCharts welcome animation"
      aria-modal="true"
    >
      <video
        className="framer-opening__video"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/media/welcome/remradar-opening-poster.jpg"
        aria-hidden="true"
        onEnded={dismiss}
        onError={() => window.setTimeout(dismiss, 650)}
      >
        <source src="/media/welcome/remradar-opening.webm" type="video/webm" />
        <source src="/media/welcome/remradar-opening.mp4" type="video/mp4" />
      </video>
      <img
        className="framer-opening__poster"
        src="/media/welcome/remradar-opening-poster.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className="framer-opening__scrim" aria-hidden="true" />
      <button type="button" className="framer-opening__skip" onClick={dismiss}>
        Skip opening
      </button>
    </div>
  );
}
