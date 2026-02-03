"use client";

import { useEffect } from "react";

export function useSnapScroll() {
  useEffect(() => {
    // Only run on desktop
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    let isSnapping = false;
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (isSnapping) return;

      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
      lastScrollY = currentScrollY;

      // Clear any pending timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Debounce the snap check
      scrollTimeout = setTimeout(() => {
        if (isSnapping) return;

        const teamsSection = document.getElementById("snap-teams");
        const bentoSection = document.getElementById("snap-bento");
        const portfolioSection = document.getElementById("snap-portfolio");

        if (!teamsSection || !bentoSection || !portfolioSection) return;

        const teamsRect = teamsSection.getBoundingClientRect();
        const bentoRect = bentoSection.getBoundingClientRect();
        const portfolioRect = portfolioSection.getBoundingClientRect();

        const viewportHeight = window.innerHeight;

        // Scroll down: Teams -> Bento -> Portfolio
        if (scrollDirection === "down") {
          // Image 1 to Image 2: When TeamsSection is scrolling out of view, snap to BentoGrid
          // Trigger when TeamsSection bottom passes the middle of viewport
          if (teamsRect.bottom < viewportHeight * 0.5 && teamsRect.bottom > 0 && bentoRect.top < viewportHeight) {
            isSnapping = true;
            const bentoTop = bentoRect.top + window.scrollY;
            window.scrollTo({
              top: bentoTop,
              behavior: "smooth",
            });
            setTimeout(() => {
              isSnapping = false;
            }, 1000);
            return;
          }

          // Image 2 to Image 3: When BentoGrid is scrolling out of view, snap to PortfolioSection
          // Only trigger when BentoGrid bottom is almost completely out of view (only 20% remaining)
          if (bentoRect.bottom < viewportHeight * 0.9 && bentoRect.bottom > 0 && portfolioRect.top < viewportHeight) {
            isSnapping = true;
            const portfolioTop = portfolioRect.top + window.scrollY;
            window.scrollTo({
              top: portfolioTop,
              behavior: "smooth",
            });
            setTimeout(() => {
              isSnapping = false;
            }, 1000);
            return;
          }
        }

        // Scroll up: Portfolio -> Bento -> Teams
        if (scrollDirection === "up") {
          // Image 3 to Image 2: If scrolling up past PortfolioSection, snap back to BentoGrid
          // Only trigger when Portfolio top is coming back into view from the bottom (80% down the viewport)
          if (portfolioRect.top > viewportHeight * 0.2 && portfolioRect.top < viewportHeight && bentoRect.bottom > 0) {
            isSnapping = true;
            const bentoTop = bentoRect.top + window.scrollY;
            window.scrollTo({
              top: bentoTop,
              behavior: "smooth",
            });
            setTimeout(() => {
              isSnapping = false;
            }, 1000);
            return;
          }

          // Image 2 to Image 1: If scrolling up past BentoGrid, snap back to TeamsSection
          if (bentoRect.top > viewportHeight * 0.5 && bentoRect.top < viewportHeight && teamsRect.bottom > 0) {
            isSnapping = true;
            const teamsTop = teamsRect.top + window.scrollY;
            window.scrollTo({
              top: teamsTop,
              behavior: "smooth",
            });
            setTimeout(() => {
              isSnapping = false;
            }, 1000);
            return;
          }
        }
      }, 100); // Reduced debounce for more responsive snapping
    };

    // Use passive listener to not interfere with other scroll handlers
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);
}
