import { useState, useEffect } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";

interface VisitorTrackerProps {
  children: React.ReactNode;
}

export const VisitorTracker = ({ children }: VisitorTrackerProps) => {
  const { addVisitor } = usePortfolio();
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const trackVisitor = async () => {
      // Check if already tracked in this session
      const tracked = sessionStorage.getItem("visitor_tracked");
      if (tracked) return;

      try {
        // Get IP and location info from a free API
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const visitorInfo = {
          ip: data.ip || "Unknown",
          device: getDeviceType(),
          browser: getBrowserName(),
          location: `${data.city || "Unknown"}, ${data.region || ""}`,
          country: data.country_name || "Unknown",
          visitedAt: new Date().toISOString(),
          timeSpent: 0,
          pagesViewed: [window.location.pathname],
        };

        addVisitor(visitorInfo);
        sessionStorage.setItem("visitor_tracked", "true");
      } catch (error) {
        console.log("Could not track visitor:", error);
      }
    };

    trackVisitor();

    // Track time spent on page unload
    const handleUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const visitors = JSON.parse(localStorage.getItem("portfolio_visitors") || "[]");
      if (visitors.length > 0) {
        visitors[0].timeSpent = timeSpent;
        localStorage.setItem("portfolio_visitors", JSON.stringify(visitors));
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [addVisitor, startTime]);

  return <>{children}</>;
};

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "Mobile";
  }
  return "Desktop";
}

function getBrowserName(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return "Unknown";
}
