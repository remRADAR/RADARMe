import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, ChartNoAxesCombined, Globe2, Mic, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

type Props = { isOpen: boolean; onClose: () => void };

export function IntelligencePanel({ isOpen, onClose }: Props) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="radar-intelligence-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="radar-intelligence-title"
            className="radar-intelligence-panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="radar-intelligence-grabber" aria-hidden="true" />
            <header className="radar-intelligence-header">
              <div className="radar-intelligence-heading">
                <span className="radar-live-dot" aria-hidden="true" />
                <div>
                  <p className="radar-panel-eyebrow">RADARMatrix</p>
                  <h2 id="radar-intelligence-title">Your intelligence layer</h2>
                </div>
              </div>
              <button
                ref={closeButton}
                type="button"
                className="radar-panel-close"
                onClick={onClose}
                aria-label="Close RADAR intelligence panel"
              >
                <X size={18} aria-hidden />
              </button>
            </header>
            <div className="radar-intelligence-content">
              <InsightCard
                icon={<ChartNoAxesCombined size={18} />}
                title="Cultural trends & charts"
                text="Read the signal across Lagos, Accra, Johannesburg and London."
                action="Explore charts"
              />
              <InsightCard
                icon={<Bot size={18} />}
                title="Artist intelligence"
                text="Find the next meaningful move for your sound and career."
                action="Open opportunities"
              />
              <InsightCard
                icon={<Globe2 size={18} />}
                title="RADAR ecosystem"
                text="Move between music, culture, community and the wider REM network."
                action="Enter the ecosystem"
              />
              <div className="radar-insight-card radar-insight-card-muted">
                <div className="radar-insight-icon">
                  <Mic size={18} />
                </div>
                <div>
                  <h3>Voice commands</h3>
                  <p>Voice intelligence is reserved for a future RADAR update.</p>
                  <button type="button" disabled>
                    Coming soon
                  </button>
                </div>
              </div>
            </div>
            <p className="radar-panel-footer">
              Powered by RADARCharts AI · Royal Empire Management
            </p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function InsightCard({
  icon,
  title,
  text,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  action: string;
}) {
  return (
    <article className="radar-insight-card">
      <div className="radar-insight-icon" aria-hidden="true">
        {icon}
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
        <button type="button">
          {action}
          <ArrowUpRight size={14} aria-hidden />
        </button>
      </div>
    </article>
  );
}
