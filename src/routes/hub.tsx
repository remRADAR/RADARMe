import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "RADARHub — Services" },
      {
        name: "description",
        content:
          "RADARHub — the business engine of RADARMe. Distribution, promotion, business tools and growth services in one place.",
      },
    ],
  }),
  component: () => <Outlet />,
});
