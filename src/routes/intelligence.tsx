import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [
      { title: "RADAR Intelligence — RADARMe" },
      {
        name: "description",
        content: "RADAR Intelligence — the immersive AI-powered career operating system inside RADARMe.",
      },
    ],
  }),
  component: () => <Outlet />,
});