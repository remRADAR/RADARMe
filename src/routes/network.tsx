import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/network")({
  head: () => ({
    meta: [
      { title: "RADARNetwork — RADARMe" },
      {
        name: "description",
        content:
          "RADARNetwork — the editorial media ecosystem of RADARMe: magazine, spotlights, playlists, RADAR TV and more.",
      },
    ],
  }),
  component: () => <Outlet />,
});
