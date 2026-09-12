import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  onShortPress: () => void;
  onLongPress: () => void;
  longPressDuration?: number;
};

export function useAIBotInteractions({
  onShortPress,
  onLongPress,
  longPressDuration = 1200,
}: Props) {
  const [isHolding, setIsHolding] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTriggered = useRef(false);
  const dragging = useRef(false);
  const pointerDown = useRef(false);

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const startTap = useCallback(() => {
    pointerDown.current = true;
    dragging.current = false;
    longPressTriggered.current = false;
    setIsHolding(true);
    clearTimer();
    timer.current = setTimeout(() => {
      if (!dragging.current && pointerDown.current) {
        longPressTriggered.current = true;
        setIsHolding(false);
        onLongPress();
      }
    }, longPressDuration);
  }, [clearTimer, longPressDuration, onLongPress]);

  const cancelHold = useCallback(() => {
    dragging.current = true;
    clearTimer();
    setIsHolding(false);
  }, [clearTimer]);

  const endTap = useCallback(() => {
    clearTimer();
    if (pointerDown.current && !longPressTriggered.current && !dragging.current) {
      onShortPress();
    }
    pointerDown.current = false;
    setIsHolding(false);
  }, [clearTimer, onShortPress]);

  useEffect(() => clearTimer, [clearTimer]);

  return { isHolding, startTap, cancelHold, endTap };
}
