"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Marks [data-reveal] elements as they enter, once per page. The hidden state only exists under html.js,
// so everything reads in full without script.
export function Reveals() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const observe = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)").forEach((el) => io.observe(el));
    observe();
    // content that renders later (filters, client lists) gets observed too
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
  return null;
}
