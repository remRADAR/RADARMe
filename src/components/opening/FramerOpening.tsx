import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "radarme_welcome_seen";
const DISPLAY_MS = 8000;
const EXIT_MS = 1200;
const REDUCED_MOTION_EXIT_MS = 450;
const SAFETY_TIMEOUT_MS = 2500;

export function FramerOpening({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dismissed = useRef(false);
  const displayTimer = useRef<number | undefined>(undefined);
  const exitTimer = useRef<number | undefined>(undefined);
  const safetyTimer = useRef<number | undefined>(undefined);

  const clearTimers = useCallback(() => {
    for (const timer of [displayTimer, exitTimer, safetyTimer]) {
      if (timer.current !== undefined) {
        window.clearTimeout(timer.current);
        timer.current = undefined;
      }
    }
  }, []);

  const dismiss = useCallback((exitDuration: number) => {
    if (dismissed.current) return;
    dismissed.current = true;
    clearTimers();
    try { window.sessionStorage.setItem(STORAGE_KEY, "true"); } catch { /* storage may be blocked in previews */ }
    setExiting(exitDuration > 0);
    exitTimer.current = window.setTimeout(() => {
      setVisible(false);
      setExiting(false);
      onComplete();
    }, exitDuration);
  }, [clearTimers, onComplete]);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) {
        onComplete();
        return;
      }
    } catch { /* continue without session storage */ }
    dismissed.current = false;
    setVisible(true);
  }, [onComplete]);

  useEffect(() => {
    if (!visible) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const exitDuration = reducedMotion ? REDUCED_MOTION_EXIT_MS : EXIT_MS;
    const preloadPoster = new Image();
    preloadPoster.src = "/media/welcome/remradar-opening-poster.jpg";
    void Promise.allSettled([document.fonts.ready, preloadPoster.decode?.() ?? Promise.resolve()]);
    displayTimer.current = window.setTimeout(() => dismiss(reducedMotion ? 550 : DISPLAY_MS), reducedMotion ? 550 : DISPLAY_MS);
    // Never let a stalled asset, hydration, or autoplay promise keep the app covered.
    safetyTimer.current = window.setTimeout(() => dismiss(0), SAFETY_TIMEOUT_MS);

    const video = videoRef.current;
    const handleEnded = () => dismiss(exitDuration);
    const handleError = () => { clearTimers(); displayTimer.current = window.setTimeout(() => dismiss(exitDuration), 650); };
    video?.addEventListener("ended", handleEnded, { once: true });
    video?.addEventListener("error", handleError, { once: true });
    video?.play().catch(() => { clearTimers(); displayTimer.current = window.setTimeout(() => dismiss(exitDuration), 850); });

    return () => {
      clearTimers();
      video?.removeEventListener("ended", handleEnded);
      video?.removeEventListener("error", handleError);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [clearTimers, dismiss, visible]);

  useEffect(() => () => clearTimers(), [clearTimers]);
  if (!visible) return null;

  return (
    <div className={`framer-opening${exiting ? " is-exiting" : ""}`} role="dialog" aria-label="RADARCharts welcome animation" aria-modal="true">
      <video ref={videoRef} className="framer-opening__video" autoPlay muted playsInline controls={false} disablePictureInPicture preload="auto" poster="/media/welcome/remradar-opening-poster.jpg" aria-hidden="true">
        <source src="/media/welcome/remradar-opening.webm" type="video/webm" />
        <source src="/media/welcome/remradar-opening.mp4" type="video/mp4" />
      </video>
      <img className="framer-opening__poster" src="/media/welcome/remradar-opening-poster.jpg" alt="" aria-hidden="true" />
      <div className="framer-opening__scrim" aria-hidden="true" />
    </div>
  );
}

export { STORAGE_KEY as RADARME_WELCOME_STORAGE_KEY };
