"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // Registering in dev churns the cache against Turbopack's asset URLs.
    if (process.env.NODE_ENV !== "production") return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration failing only costs offline support, so fail quietly.
    });
  }, []);

  return null;
}
