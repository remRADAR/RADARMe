import { useCallback, useRef, useState } from "react";
import { useAIBotInteractions } from "@/hooks/useAIBotInteractions";
import { IntelligencePanel } from "./IntelligencePanel";
import "./AIBot.styles.css";

type AIBotProps = {
  playlistId?: string;
  onMusicStateChange?: (isPlaying: boolean) => void;
};

export function AIBot({ playlistId = "PLZ_5O41VO5Mk", onMusicStateChange }: AIBotProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendPlayerCommand = useCallback((command: "playVideo" | "pauseVideo") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*",
    );
  }, []);

  const togglePlayback = useCallback(() => {
    const next = !isPlaying;
    setPlayerReady(true);
    setIsPlaying(next);
    if (next) sendPlayerCommand("playVideo");
    else sendPlayerCommand("pauseVideo");
    onMusicStateChange?.(next);
  }, [isPlaying, onMusicStateChange, sendPlayerCommand]);

  const openPanel = useCallback(() => setIsPanelOpen(true), []);
  const closePanel = useCallback(() => setIsPanelOpen(false), []);
  const { isHolding, startTap, cancelHold, endTap } = useAIBotInteractions({
    onShortPress: togglePlayback,
    onLongPress: openPanel,
  });

  return (
    <>
      {playerReady && (
        <div className="radar-bot-engine" aria-hidden="true">
          <iframe
            ref={iframeRef}
            title="RADARCharts Music Stream Engine"
            src={`https://www.youtube.com/embed?listType=playlist&list=${playlistId}&enablejsapi=1&autoplay=0`}
            allow="autoplay; encrypted-media"
            onLoad={() => {
              if (isPlaying) sendPlayerCommand("playVideo");
            }}
          />
        </div>
      )}

      <button
        type="button"
        className={`radar-bot-header-button ${isHolding ? "holding" : ""} ${isPlaying ? "playing" : ""}`}
        onPointerDown={startTap}
        onPointerUp={endTap}
        onPointerCancel={cancelHold}
        onDoubleClick={() =>
          console.info("[RADAR AI Bot] Voice commands reserved feature trigger.")
        }
        aria-label={
          isPlaying
            ? "Pause RADAR music; hold for intelligence"
            : "Play RADAR music; hold for intelligence"
        }
        title="Tap to play RADAR music. Hold for RADAR intelligence."
      >
        <span className="radar-bot-header-face" aria-hidden="true">
          <span className="radar-bot-aura" />
          <img
            className="radar-bot-gif"
            src="/media/radar-bot.gif"
            alt=""
            width={750}
            height={750}
            draggable={false}
          />
        </span>
        <span className="sr-only">Ask RADAR</span>
      </button>
      <IntelligencePanel isOpen={isPanelOpen} onClose={closePanel} />
    </>
  );
}
