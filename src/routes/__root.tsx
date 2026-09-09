import { useEffect } from "react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { useTacticsStore } from "@/lib/tactics-store";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "PoliceNet — Stonehaven Constabulary";

function HydrateStore() {
  useEffect(() => {
    void Promise.resolve(useTacticsStore.persist.rehydrate()).then(() => {
      useTacticsStore.getState().setHydrated(true);
    });
  }, []);
  return null;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "PoliceNet operational intranet for Stonehaven Constabulary. Control room action cards and tactics directory.",
      },
      { name: "theme-color", content: "#071827" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-page font-sans text-ink antialiased">
        <PreviewHostBridge />
        <HydrateStore />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "font-sans text-sm",
          }}
        />
        <Scripts />
      </body>
    </html>
  ),
});
