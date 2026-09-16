import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useAIBotInteractions } from "@/hooks/useAIBotInteractions";
import { IntelligencePanel } from "./IntelligencePanel";
import "./AIBot.styles.css";

const POSITION_KEY = "radar_bot_position";
const BOT_SIZE = 58;
const VIEWPORT_PADDING = 20;

type Position = { x: number; y: number };

export function AIBot({
  playlistId = "PLZ_5O41VO5Mk",
  onMusicStateChange,
}: {
  playlistId?: string;
  onMusicStateChange?: (isPlaying: boolean) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [mood, setMood] = useState<"idle" | "listening" | "alert">("idle");
  const [constraints, setConstraints] = useState({
    left: VIEWPORT_PADDING,
    top: VIEWPORT_PADDING,
    right: VIEWPORT_PADDING,
    bottom: VIEWPORT_PADDING,
  });
  const botRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 25, stiffness: 300, mass: 0.8 });
  const y = useSpring(rawY, { damping: 25, stiffness: 300, mass: 0.8 });

  const updateBounds = useCallback(() => {
    const maxX = Math.max(VIEWPORT_PADDING, window.innerWidth - BOT_SIZE - VIEWPORT_PADDING);
    const maxY = Math.max(VIEWPORT_PADDING, window.innerHeight - BOT_SIZE - VIEWPORT_PADDING);
    setConstraints({ left: VIEWPORT_PADDING, top: VIEWPORT_PADDING, right: maxX, bottom: maxY });
    rawX.set(Math.min(Math.max(rawX.get(), VIEWPORT_PADDING), maxX));
    rawY.set(Math.min(Math.max(rawY.get(), VIEWPORT_PADDING), maxY));
  }, [rawX, rawY]);

  useEffect(() => {
    const maxX = Math.max(VIEWPORT_PADDING, window.innerWidth - BOT_SIZE - VIEWPORT_PADDING);
    const maxY = Math.max(VIEWPORT_PADDING, window.innerHeight - BOT_SIZE - VIEWPORT_PADDING);
    let saved: Position | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(POSITION_KEY) || "null");
    } catch {
      saved = null;
    }
    rawX.set(
      typeof saved?.x === "number" ? Math.min(Math.max(saved.x, VIEWPORT_PADDING), maxX) : maxX,
    );
    rawY.set(
      typeof saved?.y === "number" ? Math.min(Math.max(saved.y, VIEWPORT_PADDING), maxY) : maxY,
    );
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [rawX, rawY, updateBounds]);

  const togglePlayback = useCallback(() => {
    const next = !isPlaying;
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "playVideo" : "pauseVideo", args: [] }),
      "*",
    );
    setIsPlaying(next);
    setMood(next ? "listening" : "idle");
    onMusicStateChange?.(next);
  }, [isPlaying, onMusicStateChange]);

  const openPanel = useCallback(() => {
    setMood("alert");
    setIsPanelOpen(true);
  }, []);
  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
    setMood(isPlaying ? "listening" : "idle");
  }, [isPlaying]);
  const { isHolding, startTap, cancelHold, endTap } = useAIBotInteractions({
    onShortPress: togglePlayback,
    onLongPress: openPanel,
  });

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!botRef.current || isPanelOpen) return;
      const rect = botRef.current.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.min(Math.hypot(dx, dy) / 150, 1);
      const angle = Math.atan2(dy, dx);
      botRef.current.style.setProperty("--gaze-x", `${Math.cos(angle) * distance * 3}px`);
      botRef.current.style.setProperty("--gaze-y", `${Math.sin(angle) * distance * 3}px`);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isPanelOpen]);

  return (
    <>
      <div className="radar-bot-engine" aria-hidden="true">
        <iframe
          ref={iframeRef}
          title="RADARCharts Music Stream Engine"
          src={`https://www.youtube.com/embed?listType=playlist&list=${playlistId}&enablejsapi=1&autoplay=0`}
          allow="autoplay; encrypted-media"
        />
      </div>
      <motion.div
        ref={botRef}
        className={`radar-bot-wrapper ${mood} ${isHolding ? "holding" : ""} ${isPlaying ? "playing" : ""}`}
        drag
        dragConstraints={constraints}
        dragElastic={0.15}
        dragMomentum
        onDragStart={cancelHold}
        onDragEnd={() => {
          localStorage.setItem(
            POSITION_KEY,
            JSON.stringify({ x: Math.round(rawX.get()), y: Math.round(rawY.get()) }),
          );
        }}
        onPointerDown={startTap}
        onPointerUp={endTap}
        onDoubleClick={() =>
          console.info("[RADAR AI Bot] Voice commands reserved feature trigger.")
        }
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.12, cursor: "grabbing" }}
        style={{ x, y, top: 0, left: 0, touchAction: "none" }}
        role="button"
        tabIndex={0}
        aria-label={
          isPlaying
            ? "Pause RADAR music; hold for intelligence"
            : "Play RADAR music; hold for intelligence"
        }
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            togglePlayback();
          }
          if (event.key === "i") openPanel();
        }}
      >
        <div className="radar-bot-face" aria-hidden="true">
          <div className="radar-bot-aura" />
          <img
            className="radar-bot-gif"
            src="/media/radar-bot.gif"
            alt=""
            width={750}
            height={750}
            draggable={false}
          />
          <div className="radar-bot-status">
            {isPlaying ? (
              <Pause size={10} fill="currentColor" />
            ) : (
              <Play size={10} fill="currentColor" />
            )}
          </div>
        </div>
        <span className="radar-bot-drag-indicator" aria-hidden="true" />
      </motion.div>
      <IntelligencePanel isOpen={isPanelOpen} onClose={closePanel} />
    </>
  );
}
