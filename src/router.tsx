import { QueryClient } from "@tanstack/react-query";
import { createRouter, Link, type ErrorComponentProps } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/** Parse query strings defensively so malformed or test-only parameters never prevent boot. */
function parseSearch(search: string): Record<string, string | string[]> {
  try {
    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const result: Record<string, string | string[]> = {};
    for (const [key, value] of params) {
      const previous = result[key];
      result[key] =
        previous === undefined
          ? value
          : Array.isArray(previous)
            ? [...previous, value]
            : [previous, value];
    }
    return result;
  } catch (error) {
    console.warn("[RADARMe] Ignoring invalid search parameters", error);
    return {};
  }
}

function RouterErrorComponent({ error }: ErrorComponentProps) {
  const message = error instanceof Error ? error.message : "An unexpected error occurred.";
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn&apos;t load</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

function RouterNotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Page not found.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  return createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    parseSearch,
    defaultErrorComponent: RouterErrorComponent,
    defaultNotFoundComponent: RouterNotFoundComponent,
  });
};
