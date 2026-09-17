import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { error: Error | null };

/** Last-resort client boundary for errors outside TanStack Router's route boundaries. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: unknown): State {
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[RADARMe] Unhandled render error", error, errorInfo);
  }

  private reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-4 text-foreground">
        <div className="max-w-lg text-center">
          <h1 className="text-xl font-semibold">RADARMe couldn&apos;t render this page</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The app recovered from an unexpected error. Try again or return home.
          </p>
          <details className="mt-4 text-left text-xs text-muted-foreground">
            <summary className="cursor-pointer">Error details</summary>
            <pre className="mt-2 max-h-32 overflow-auto whitespace-pre-wrap">
              {this.state.error.message}
            </pre>
          </details>
          <div className="mt-6 flex justify-center gap-2">
            <button
              type="button"
              onClick={this.reset}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Try again
            </button>
            <a href="/" className="rounded-md border border-input px-4 py-2 text-sm font-medium">
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
