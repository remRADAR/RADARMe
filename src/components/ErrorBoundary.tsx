import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[RADARMe] Homepage section failed", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="radar-section-fallback" role="status">
            <strong>Something shifted.</strong>
            <span>We’re recalibrating this section.</span>
            <button type="button" onClick={() => window.location.reload()}>
              Refresh
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
